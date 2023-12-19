<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Category;
use App\Entity\Image;
use App\Entity\User;
use App\Entity\Order;
use App\Entity\ProductOrder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;

    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('/products', name: 'app_products', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $request = Request::createFromGlobals();
        $order = $request->query->get('order', 'asc');
        $limit = $request->query->get('limit', 10);
        $start = $request->query->get('start', 0);
        $category = $request->query->get('category', null);

        if ($category) {
            $products = $this->entityManager->getRepository(Product::class)->findBy(['category' => $category], ['id' => $order], $limit, $start);
        } else {
            $products = $this->entityManager->getRepository(Product::class)->findBy([], ['id' => $order], $limit, $start);
        }

        $productArray = [];

        foreach ($products as $product) {
            $productArray[] = $product->serializeAll();
        }
        return $this->json($productArray);
    }

    #[Route('/product/{id}', name: 'app_product', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        return $this->json($product->serializeAll());
    }

    #[Route('/product', name: 'app_product_create', methods: ['POST'])]
    public function create(Request $request, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $product = $this->createProductFromRequest($data);

        $errors = $validator->validate($product);

        if (count($errors) > 0) {
            return $this->json(['status' => false, 'error' => (string) $errors], 400);
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return $this->json(['status' => true, 'id' => $product->getId()]);
    }

    // purchase route (post)
    #[Route('/purchase', name: 'app_purchase', methods: ['POST'])]
    public function purchase(Request $request, ValidatorInterface $validator): JsonResponse
    {
        /*
        data:
            - products: array of product id and quantity
            - type: number 1 or 2
            - shipping-data: null if user is not null object of shipping data (email, lastname, firstname, address, country)
        */

        $data = json_decode($request->getContent(), true);

        // get logged in user from cookies synphony
        $user = $this->getUser();
        $shippingData = $data['shippingdata'] ?? null;
        $products = $data['products'] ?? null;
        $email = $shippingData['email'] ?? null;
        $firstname = $shippingData['firstname'] ?? null;
        $lastname = $shippingData['lastname'] ?? null;
        $address = $shippingData['address'] ?? null;
        $country = $shippingData['country'] ?? null;



        if ($user) {
            if ($email != $user->getEmail()) {
                return $this->json(['status' => false, 'error' => 'Email does not match']);
            }
            if ($firstname != $user->getFirstName()) {
                return $this->json(['status' => false, 'error' => 'Firstname does not match']);
            }
            if ($lastname != $user->getLastName()) {
                return $this->json(['status' => false, 'error' => 'Lastname does not match']);
            }
            if ($address != $user->getAddress()) {
                return $this->json(['status' => false, 'error' => 'Address does not match']);
            }
            if ($country != $user->getCountry()) {
                return $this->json(['status' => false, 'error' => 'Country does not match']);
            }
        } else {
            if (!$email || !$firstname || !$lastname || !$address || !$country) {
                return $this->json(['status' => false, 'error' => $request->getContent()]);
                
            }
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
            if (!$user) {
                // create new user
                $user = new User();
                $user->setEmail($email);
                $user->setFirstName($firstname);
                $user->setLastName($lastname);
                $user->setRole(0);
                $user->setPhone('');
                $user->setAddress($address);
                $user->setCountry($country);

                $user->setPassword(null);

                $this->entityManager->persist($user);
                $this->entityManager->flush();
            }
            if ($user->getRole() != 0) {
                return $this->json(['status' => false, 'error' => 'User already exists']);
            }
        }

        $order = new Order();
        $order->setDate(new \DateTime('now'));
        $order->setType($data['type']);
        $order->setStatus(0);
        $order->setClient($user);

        // products contains an array of product id and quantity
        foreach ($products as $product_data) {
            $product = $this->entityManager->getRepository(Product::class)->find($product_data['id']);
            $quantity = $product_data['quantity'];
            if ($product && $quantity > 0 && $product->getQuantity() >= $quantity) {
                $productOrder = new ProductOrder();
                $productOrder->setProduct($product);
                $productOrder->setQuantity($quantity);
                $productOrder->setInOrder($order);
                $order->addProductOrder($productOrder);
            }
        }

        $errors = $validator->validate($order);

        if (count($errors) > 0) {
            return $this->json(['status' => false, 'error' => (string) $errors], 400);
        }

        $this->entityManager->persist($order);
        $this->entityManager->flush();

        return $this->json(['status' => true]);
    }

    #[Route('/product/{id}', name: 'app_product_delete', methods: ['DELETE'])]
    public function delete(Product $product): JsonResponse
    {
        $this->entityManager->remove($product);
        $this->entityManager->flush();

        return $this->json(['status' => true]);
    }

    #[Route('/product/{id}', name: 'app_product_update', methods: ['PATCH'])]
    public function update(Request $request, Product $product, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $product = $this->updateProductFromRequest($product, $data);

        $errors = $validator->validate($product);

        if (count($errors) > 0) {
            return $this->json(['status' => false, 'error' => (string) $errors], 400);
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return $this->json(['status' => true]);
    }

    private function createProductFromRequest(array $data): Product
    {
        $name = $data['name'] ?? null;
        $price = $data['price'] ?? null;
        $description = $data['description'] ?? null;
        $quantity = $data['quantity'] ?? null;
        $category = $data['category'] ?? null;

        $product = new Product();
        $product->setName($name);
        $product->setPrice($price);
        $product->setDescription($description);
        $product->setQuantity($quantity);
        $product->setDate(new \DateTime('now'));
        $product->setCategory($this->entityManager->getRepository(Category::class)->find($category));

        return $product;
    }

    private function updateProductFromRequest(Product $product, array $data): Product
    {
        $name = $data['name'] ?? null;
        $price = $data['price'] ?? null;
        $description = $data['description'] ?? null;
        $quantity = $data['quantity'] ?? null;
        $category = $data['category'] ?? null;

        if (!empty($name)) {
            $product->setName($name);
        }
        if (!empty($price)) {
            $product->setPrice($price);
        }
        if (!empty($description)) {
            $product->setDescription($description);
        }
        if (!empty($quantity)) {
            $product->setQuantity($quantity);
        }
        if (!empty($category)) {
            $product->setCategory($this->entityManager->getRepository(Category::class)->find($category));
        }

        return $product;
    }

    #[Route('/product/{id}/add-image', name: 'app_product_add_image', methods: ['POST'])]
    public function addImage(Request $request, Product $product): JsonResponse
    {
        $uploadedFile = $request->files->get('image');
    
        // Handle file upload logic, move the file to the desired directory, etc.
        // You may want to use a service or manager class for handling file uploads.
    
        // Move the uploaded file to a directory
        $uploadsDirectory = $this->getParameter('images_directory'); // This parameter in services.yaml or config file
        $fileName = md5(uniqid()) . '.' . $uploadedFile->getClientOriginalExtension();
        $uploadedFile->move($uploadsDirectory, $fileName);
    
        $image = new Image();
        $image->setUrl($fileName);
        $image->setProduct($product);
    
        $this->entityManager->persist($product);
        $this->entityManager->persist($image);
        $this->entityManager->flush();
    
        return $this->json(['status' => true]);
    }

    #[Route('/product/{id}/remove-image/{imageId}', name: 'app_product_remove_image', methods: ['DELETE'])]
    public function removeImage(Product $product, int $imageId): JsonResponse
    {
        $imageRepository = $this->entityManager->getRepository(Image::class);
        $image = $imageRepository->find($imageId);

        if (!$image) {
            return $this->json(['status' => false, 'error' => 'Image not found.'], 404);
        }

        if ($image->getProduct()->getId() !== $product->getId()) {
            return $this->json(['status' => false, 'error' => 'Image not found for the specified product.'], 404);
        }

        $uploadsDirectory = $this->getParameter('images_directory');
        $imagePath = $uploadsDirectory . '/' . $image->getUrl();
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }

        $product->removeImage($image);
        $this->entityManager->remove($image);
        $this->entityManager->flush();

        return $this->json(['status' => true]);
    }
}

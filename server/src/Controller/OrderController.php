<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\ProductOrder;
use App\Entity\Product;
use App\Entity\Category;
use App\Entity\Image;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class OrderController extends AbstractController
{
    #[Route('/orders', name: 'app_orders')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $request = Request::createFromGlobals();
        $order = $request->query->get('order', 'asc');
        $limit = $request->query->get('limit', 10);
        $start = $request->query->get('start', 0);
        
        $orders = $entityManager->getRepository(Order::class)->findBy([], ['id' => $order], $limit, $start);

        $arr = [];

        foreach ($orders as $order) {
            $arr[] = [$order->serializeAll()];
        }

        return $this->json($arr);
    }

    #[Route('/order/{id}', name: 'app_order', methods: ['GET'])]
    public function show(EntityManagerInterface $entityManager, int $id): Response
    {
        $order = $entityManager->getRepository(Order::class)->find($id);

        if (!$order)
            return $this->json(['error' => 'Order not found']);

        return $this->json($order->serializeAll());
    }

    #[Route('/order', name: 'app_order_create', methods: ['POST'])]
    public function create(EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {
        $request = Request::createFromGlobals();
        $data = json_decode($request->getContent(), true);

        $order = new Order();
        $order->setDate(new \DateTime('now'));
        $order->setType($data['type']);
        $order->setStatus($data['status']);
        $order->setClient($entityManager->getRepository(User::class)->find($data['client']));
                
        // products contains an array of product id and quantity
        foreach ($data['products'] as $product_data) {
            $product = $entityManager->getRepository(Product::class)->find($product_data['id']);
            $quantity = $product_data['quantity'];
            if ($product && $quantity > 0) {
                $productOrder = new ProductOrder();
                $productOrder->setProduct($product);
                $productOrder->setQuantity($quantity);
                $productOrder->setInOrder($order);
                $order->addProductOrder($productOrder);
            }
        }

        $errors = $validator->validate($order);

        if (count($errors) > 0)
            return $this->json($errors);

        $entityManager->persist($order);
        $entityManager->flush();

        return $this->json($order->serializeAll());
    }

    // patch
    #[Route('/order/{id}', name: 'app_order_update', methods: ['PATCH'])]
    public function update(EntityManagerInterface $entityManager, ValidatorInterface $validator, int $id): Response
    {
        $request = Request::createFromGlobals();
        $data = json_decode($request->getContent(), true);

        $order = $entityManager->getRepository(Order::class)->find($id);

        if (!$order)
            return $this->json(['error' => 'Order not found']);

        if (isset($data['type']))
            $order->setType($data['type']);
        if (isset($data['status']))
            $order->setStatus($data['status']);
        if (isset($data['date']))
            $order->setDate($data['date']);
        if (isset($data['products'])) {

            foreach ($order->getProductOrders() as $productOrder) {
                $order->removeProductOrder($productOrder);
            }

            foreach ($data['products'] as $product_data) {
                $product = $entityManager->getRepository(Product::class)->find($product_data['id']);
                $quantity = $product_data['quantity'];
                if ($product && $quantity > 0) {
                    $productOrder = new ProductOrder();
                    $productOrder->setProduct($product);
                    $productOrder->setQuantity($quantity);
                    $productOrder->setInOrder($order);
                    $order->addProductOrder($productOrder);
                }
            }

        }

        $errors = $validator->validate($order);

        if (count($errors) > 0)
            return $this->json($errors);

        $entityManager->persist($order);
        $entityManager->flush();

        return $this->json($order->serializeAll());
    }

    #[Route('/order/{id}', name: 'app_order_delete', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        $order = $entityManager->getRepository(Order::class)->find($id);

        if (!$order)
            return $this->json(['error' => 'Order not found']);

        $entityManager->remove($order);
        $entityManager->flush();

        return $this->json(['message' => 'Order deleted']);
    }

    #[Route('/purchase', name: 'app_purchase', methods: ['POST'])]
    public function purchase(EntityManagerInterface $entityManager, Request $request, ValidatorInterface $validator): Response
    {
        $data = json_decode($request->getContent(), true);

        $user = $this->getUser();
        $shippingData = $data['shippingdata'] ?? null;
        $products = $data['products'] ?? null;
        $email = $shippingData['email'] ?? null;
        $firstname = $shippingData['firstname'] ?? null;
        $lastname = $shippingData['lastname'] ?? null;
        $address = $shippingData['address'] ?? null;
        $country = $shippingData['country'] ?? null;



        if ($user) {
            $email = $user->getEmail();
            $firstname = $user->getFirstName();
            $lastname = $user->getLastName();
            $address = $user->getAddress();
            $country = $user->getCountry();
        } else {
            if (!$email || !$firstname || !$lastname || !$address || !$country) {
                return $this->json(['status' => false, 'error' => $request->getContent()]);
                
            }
            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
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

                $entityManager->persist($user);
                $entityManager->flush();
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
            $product = $entityManager->getRepository(Product::class)->find($product_data['id']);
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

        $entityManager->persist($order);
        $entityManager->flush();

        return $this->json(['status' => true]);
    }
}

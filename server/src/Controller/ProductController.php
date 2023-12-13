<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Category;
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
        $products = $this->entityManager->getRepository(Product::class)->findAll();
        $productArray = array();

        foreach ($products as $product) {
            $productArray[] = $this->serializeProduct($product);
        }
        return $this->json($productArray);
    }

    #[Route('/product/{id}', name: 'app_product', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        return $this->json($this->serializeProduct($product));
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


    private function serializeProduct(Product $product): array
    {
        $category = null;
        if ($product->getCategory() != null) {
            $category = $this->entityManager->getRepository(Category::class)->find($product->getCategory()->getId());
            $category = $category->serialize($category);
        }

        return [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'description' => $product->getDescription(),
            'quantity' => $product->getQuantity(),
            'category' => $category
        ];
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
        $product->setCategory($this->entityManager->getRepository(Category::class)->find($category)->getId());

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
            $product->setCategory($this->entityManager->getRepository(Category::class)->find($category->getId()));
        }

        return $product;
    }
}

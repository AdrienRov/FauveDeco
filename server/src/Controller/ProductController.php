<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'app_products', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $request = Request::createFromGlobals();
        $order = $request->query->get('order', 'asc');
        $limit = $request->query->get('limit', 10);
        $start = $request->query->get('start', 0);

        $products = $entityManager->getRepository(Product::class)->findBy([], ['id' => $order], $limit, $start);

        $arr = [];
        foreach ($products as $product) {
            $arr[] = $this->serializeProduct($product);
        }

        return $this->json($arr);
    }

    #[Route('/product/{id}', name: 'app_product', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        return $this->json($this->serializeProduct($product));
    }

    #[Route('/product', name: 'app_product_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $product = $this->createProductFromRequest($data);

        $errors = $validator->validate($product);

        if (count($errors) > 0) {
            return $this->json(['status' => false, 'error' => (string) $errors], 400);
        }

        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json(['status' => true, 'id' => $product->getId()]);
    }

    #[Route('/product/{id}', name: 'app_product_delete', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($product);
        $entityManager->flush();

        return $this->json(['status' => true]);
    }

    #[Route('/product/{id}', name: 'app_product_update', methods: ['PATCH'])]
    public function update(Request $request, Product $product, EntityManagerInterface $entityManager, ValidatorInterface $validator): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $product = $this->updateProductFromRequest($product, $data);

        $errors = $validator->validate($product);

        if (count($errors) > 0) {
            return $this->json(['status' => false, 'error' => (string) $errors], 400);
        }

        $entityManager->persist($product);
        $entityManager->flush();

        return $this->json(['status' => true]);
    }


    private function serializeProduct(Product $product): array
    {
        return [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'description' => $product->getDescription(),
            'quantity' => $product->getQuantity(),
            'category' => $product->getCategory() ? $product->getCategory()->getId() : null,

        ];
    }


    private function createProductFromRequest(array $data): Product
    {
        $name = $data['name'] ?? null;
        $price = $data['price'] ?? null;
        $description = $data['description'] ?? null;
        $quantity = $data['quantity'] ?? null;

        $product = new Product();
        $product->setName($name);
        $product->setPrice($price);
        $product->setDescription($description);
        $product->setQuantity($quantity);



        return $product;
    }


    private function updateProductFromRequest(Product $product, array $data): Product
    {
        $name = $data['name'] ?? null;
        $price = $data['price'] ?? null;
        $description = $data['description'] ?? null;
        $quantity = $data['quantity'] ?? null;

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

        return $product;
    }
}

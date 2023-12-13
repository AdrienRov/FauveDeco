<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\ProductOrder;
use App\Entity\Product;
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
        $orders = $entityManager->getRepository(Order::class)->findAll();

        $arr = [];

        foreach ($orders as $order) {

            $products = [];
            foreach ($order->getProductOrders() as $productOrder) {
                $products[] = [
                    'id' => $productOrder->getProduct()->getId(),
                    'name' => $productOrder->getProduct()->getName(),
                    'price' => $productOrder->getProduct()->getPrice(),
                    'quantity' => $productOrder->getQuantity()
                ];
            }

            $arr[] = [
                'id' => $order->getId(),
                'total' => $order->getTotal(),
                'date' => $order->getDate(),
                'type' => $order->getType(),
                'status' => $order->getStatus(),
                'client' => $order->getClient()->getId(),
                'products' => $products
            ];
        }

        return $this->json($arr);
    }

    #[Route('/order/{id}', name: 'app_order', methods: ['GET'])]
    public function show(EntityManagerInterface $entityManager, int $id): Response
    {
        $order = $entityManager->getRepository(Order::class)->find($id);

        if (!$order)
            return $this->json(['error' => 'Order not found']);

        $products = [];
        foreach ($order->getProductOrders() as $productOrder) {
            $products[] = [
                'id' => $productOrder->getProduct()->getId(),
                'name' => $productOrder->getProduct()->getName(),
                'price' => $productOrder->getProduct()->getPrice(),
                'quantity' => $productOrder->getQuantity()
            ];
        }

        return $this->json([
            'id' => $order->getId(),
            'total' => $order->getTotal(),
            'date' => $order->getDate(),
            'type' => $order->getType(),
            'status' => $order->getStatus(),
            'client' => $order->getClient()->getId(),
            'products' => $products
        ]);
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
                
        $total = 0;
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
                $total += $product->getPrice() * $quantity;
            }
        }
        $order->setTotal($total);        

        $errors = $validator->validate($order);

        if (count($errors) > 0)
            return $this->json($errors);

        $entityManager->persist($order);
        $entityManager->flush();

        $products = [];
        foreach ($order->getProductOrders() as $productOrder) {
            $products[] = [
                'id' => $productOrder->getProduct()->getId(),
                'name' => $productOrder->getProduct()->getName(),
                'price' => $productOrder->getProduct()->getPrice(),
                'quantity' => $productOrder->getQuantity()
            ];
        }

        return $this->json([
            'id' => $order->getId(),
            'total' => $order->getTotal(),
            'date' => $order->getDate(),
            'type' => $order->getType(),
            'status' => $order->getStatus(),
            'client' => $order->getClient()->getId(),
            'products' => $products
        ]);
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
        if (isset($data['products'])) {
            $total = 0;

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
                    $total += $product->getPrice() * $quantity;
                }
            }

            $order->setTotal($total);
        }

        $errors = $validator->validate($order);

        if (count($errors) > 0)
            return $this->json($errors);

        $entityManager->persist($order);
        $entityManager->flush();

        $products = [];
        foreach ($order->getProductOrders() as $productOrder) {
            $products[] = [
                'id' => $productOrder->getProduct()->getId(),
                'name' => $productOrder->getProduct()->getName(),
                'price' => $productOrder->getProduct()->getPrice(),
                'quantity' => $productOrder->getQuantity()
            ];
        }

        return $this->json([
            'id' => $order->getId(),
            'total' => $order->getTotal(),
            'date' => $order->getDate(),
            'type' => $order->getType(),
            'status' => $order->getStatus(),
            'client' => $order->getClient()->getId(),
            'products' => $products
        ]);
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

}

<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProductOrderController extends AbstractController
{
    #[Route('/product/order', name: 'app_product_order')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        return $this->render('product_order/index.html.twig', [
            'controller_name' => 'ProductOrderController',
        ]);
    }
}

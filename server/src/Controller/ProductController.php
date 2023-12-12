<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Bundle\DoctrineBundle\DoctrineBundle;


class ProductController extends AbstractController
{
    #[Route('/product', name: 'app_product')]
    public function index(): Response
    {
        return $this->render('product/index.html.twig', [
            'controller_name' => 'ProductController',
        ]);
    }

    #[Route('/product/{id}', name: 'app_product_show')]
    public function show($id): Response
    {
        return $this->render('product/show.html.twig', [
            'controller_name' => 'ProductController',
            'id' => $id
        ]);
    }

    #[Route('/product/{id}/edit', name: 'app_product_edit')]
    public function edit($id): Response
    {
        return $this->render('product/edit.html.twig', [
            'controller_name' => 'ProductController',
            'id' => $id
        ]);
    }

    #[Route('/product/{id}/delete', name: 'app_product_delete')]
    public function delete($id): Response
    {
        return $this->render('product/delete.html.twig', [
            'controller_name' => 'ProductController',
            'id' => $id
        ]);
    }

    #[Route('/product/new', name: 'app_product_new')]
    public function new(): Response
    {
        return $this->render('product/new.html.twig', [
            'controller_name' => 'ProductController',
        ]);
    }
}

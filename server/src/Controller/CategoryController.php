<?php

namespace App\Controller;

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends AbstractController
{
    #[Route('/categories', name: 'app_categories')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        // get all categories from database
        $categories = $entityManager->getRepository(Category::class)->findAll();

        $arr = [];
        foreach ($categories as $category) {
            $arr[] = [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'parent' => $category->getParent() ? $category->getParent()->getId() : null
            ];
        }


        $response = new Response();
        $response->setContent(json_encode([
            $arr
        ]));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    #[Route('/category/{id}', name: 'app_category', methods: ['GET'])]
    public function show(EntityManagerInterface $entityManager, int $id): Response
    {
        // get category from database
        $category = $entityManager->getRepository(Category::class)->find($id);
        
        $response = new Response();
        $response->setContent(json_encode([
            'id' => $category->getId(),
            'name' => $category->getName(),
            'parent' => $category->getParent() ? $category->getParent()->getId() : null,
            'sub_categories' => $category->getSubCategories()->map(fn($category) => $category->getId())->toArray(),
        ]));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    // Post to create new category
    #[Route('/category', name: 'app_category_create', methods: ['POST'])]
    public function create(EntityManagerInterface $entityManager): Response
    {
        // get name and parent from request
        $request = Request::createFromGlobals();
        $data = json_decode($request->getContent(), true);

        $name = $data['name'] ?? null;
        $parent = $data['parent'] ?? null;

        // validate name
        if (empty($name)) {
            $response = new Response();
            $response->setContent(json_encode([
                'error' => 'Name is required'
            ]));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        // validate parent
        if (!empty($parent)) {
            $parent = $entityManager->getRepository(Category::class)->find($parent);
            if (!$parent) {
                $response = new Response();
                $response->setContent(json_encode([
                    'error' => 'Parent category not found'
                ]));
                $response->headers->set('Content-Type', 'application/json');
                return $response;
            }
        }

        // create new category
        $category = new Category();
        $category->setName($name);
        $category->setParent($parent);

        // save to database
        $entityManager->persist($category);
        $entityManager->flush();

        $response = new Response();
        $response->setContent(json_encode([
            'success' => 'Category created'
        ]));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    // Delete a category
    #[Route('/category/{id}', name: 'app_category_delete', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        // get category from database
        $category = $entityManager->getRepository(Category::class)->find($id);

        // validate category
        if (!$category) {
            $response = new Response();
            $response->setContent(json_encode([
                'error' => 'Category not found'
            ]));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        


        // delete category
        $entityManager->remove($category);
        $entityManager->flush();

        $response = new Response();
        $response->setContent(json_encode([
            'success' => 'Category deleted'
        ]));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    // Patch to update category
    #[Route('/category/{id}', name: 'app_category_update', methods: ['PATCH'])]
    public function update(EntityManagerInterface $entityManager, int $id): Response
    {
        // get category from database
        $category = $entityManager->getRepository(Category::class)->find($id);

        // validate category
        if (!$category) {
            $response = new Response();
            $response->setContent(json_encode([
                'error' => 'Category not found'
            ]));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }

        // get name and parent from request
        $request = Request::createFromGlobals();
        $data = json_decode($request->getContent(), true);

        $name = $data['name'] ?? null;
        $parent = $data['parent'] ?? null;

        // check if set to update
        if (!empty($name)) {
            $category->setName($name);
        }

        // check if set to update
        if (!empty($parent)) {
            $parent = $entityManager->getRepository(Category::class)->find($parent);
            if (!$parent) {
                $response = new Response();
                $response->setContent(json_encode([
                    'error' => 'Parent category not found'
                ]));
                $response->headers->set('Content-Type', 'application/json');
                return $response;
            }
            $category->setParent($parent);
        }



        // save to database
        $entityManager->persist($category);
        $entityManager->flush();

        $response = new Response();
        $response->setContent(json_encode([
            'success' => 'Category updated',
            'name' => $request->getContent()
        ]));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}

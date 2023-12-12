<?php

namespace App\Controller;

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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
        return $this->json($arr);
    }

    #[Route('/category/{id}', name: 'app_category', methods: ['GET'])]
    public function show(EntityManagerInterface $entityManager, int $id): Response
    {
        // get category from database
        $category = $entityManager->getRepository(Category::class)->find($id);

        if (!$category) {
            return $this->json([
                'status' => false,
                'error' => 'Category not found'
            ]);
        }
        
        return $this->json([
            'id' => $category->getId(),
            'name' => $category->getName(),
            'parent' => $category->getParent() ? $category->getParent()->getId() : null,
            'sub_categories' => $category->getSubCategories()->map(fn($category) => $category->getId())->toArray(),
        ]);
    }

    // Post to create new category
    #[Route('/category', name: 'app_category_create', methods: ['POST'])]
    public function create(EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {
        // get name and parent from request
        $request = Request::createFromGlobals();
        $data = json_decode($request->getContent(), true);

        $name = $data['name'] ?? null;
        $parent = $data['parent'] ?? null;

        // create new category
        $category = new Category();
        $category->setName($name);

        if (!empty($parent))
        {
            $parent = $entityManager->getRepository(Category::class)->find($parent);
            if (!$parent) {
                return $this->json([
                    'status' => false,
                    'error' => 'Parent category not found'
                ]);
            }
            $category->setParent($parent);
        }

        // validate category
        $errors = $validator->validate($category);

        if (count($errors) > 0) {
            return $this->json([
                'status' => false,
                'error' => (string) $errors
            ]);
        }

        // save to database
        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json([
            'status' => true,
            'id' => $category->getId()
        ]);
    }

    // Delete a category
    #[Route('/category/{id}', name: 'app_category_delete', methods: ['DELETE'])]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        // get category from database
        $category = $entityManager->getRepository(Category::class)->find($id);

        // validate category
        if (!$category) {
            return $this->json([
                'status' => false,
                'error' => 'Category not found'
            ]);
        }

        // delete category
        $entityManager->remove($category);
        $entityManager->flush();

        return $this->json([
            'status' => true
        ]);
    }

    // Patch to update category
    #[Route('/category/{id}', name: 'app_category_update', methods: ['PATCH'])]
    public function update(EntityManagerInterface $entityManager, ValidatorInterface $validator, int $id): Response
    {
        // get category from database
        $category = $entityManager->getRepository(Category::class)->find($id);

        // validate category
        if (!$category) {
            return $this->json([
                'status' => false,
                'error' => 'Category not found'
            ]);
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
        if (!empty($parent))
        {
            $parent = $entityManager->getRepository(Category::class)->find($parent);
            if (!$parent) {
                return $this->json([
                    'status' => false,
                    'error' => 'Parent category not found'
                ]);
            }
            $category->setParent($parent);
        }

        // validate category
        $errors = $validator->validate($category);

        if (count($errors) > 0) {
            return $this->json([
                'status' => false,
                'error' => (string) $errors
            ]);
        }


        // save to database
        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json([
            'status' => true
        ]);
    }
}

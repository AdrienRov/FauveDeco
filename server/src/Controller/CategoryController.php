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
            $arr[] = $category->serializeAll();
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
        
        return $this->json($category->serializeAll());
    }

    // Post to create new category
    #[Route('/category', name: 'app_category_create', methods: ['POST'])]
    public function create(EntityManagerInterface $entityManager, ValidatorInterface $validator): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $request = Request::createFromGlobals();
        $data = json_decode($request->getContent(), true);

        $name = $data['name'] ?? null;
        $parent = $data['parent'] ?? null;
        $image_url = $data['image_url'] ?? null;

        // create new category
        $category = new Category();
        $category->setName($name);
        $category->setImageUrl($image_url);

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
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
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

    // set image (post)
    #[Route('/category/{id}/image', name: 'app_category_image', methods: ['POST'])]
    public function setImage(EntityManagerInterface $entityManager, int $id): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $category = $entityManager->getRepository(Category::class)->find($id);

        // validate category
        if (!$category) {
            return $this->json([
                'status' => false,
                'error' => 'Category not found'
            ]);
        }

        // get image from request
        $request = Request::createFromGlobals();
        $image = $request->files->get('image');

        // validate image
        if (!$image) {
            return $this->json([
                'status' => false,
                'error' => 'Image not found'
            ]);
        }

        $uploadedFile = $request->files->get('image');
    
        // Handle file upload logic, move the file to the desired directory, etc.
        // You may want to use a service or manager class for handling file uploads.
    
        // Move the uploaded file to a directory
        $uploadsDirectory = $this->getParameter('images_directory'); // This parameter in services.yaml or config file
        $fileName = md5(uniqid()) . '.' . $uploadedFile->getClientOriginalExtension();
        $uploadedFile->move($uploadsDirectory, $fileName);
        
        # add http host and port to the url
        $finalUrl = $request->getSchemeAndHttpHost() . "/images/$fileName";

        $category->setImageUrl($finalUrl);

        // save to database
        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json([
            'status' => true,
            'url' => $finalUrl
        ]);
    }

    // delete image
    #[Route('/category/{id}/image', name: 'app_category_image_delete', methods: ['DELETE'])]
    public function deleteImage(EntityManagerInterface $entityManager, int $id): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $category = $entityManager->getRepository(Category::class)->find($id);

        // validate category
        if (!$category) {
            return $this->json([
                'status' => false,
                'error' => 'Category not found'
            ]);
        }

        $category->setImageUrl(null);

        // save to database
        $entityManager->persist($category);
        $entityManager->flush();

        return $this->json([
            'status' => true
        ]);
    }

    // Patch to update category
    #[Route('/category/{id}', name: 'app_category_update', methods: ['PATCH'])]
    public function update(EntityManagerInterface $entityManager, ValidatorInterface $validator, int $id): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
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
        $image_url = $data['image_url'] ?? null;

        // check if set to update
        if (!empty($name)) {
            $category->setName($name);
        }
        if (!empty($image_url)) {
            $category->setImageUrl($image_url);
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

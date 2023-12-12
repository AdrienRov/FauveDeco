<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    #[Route('/users', name: 'app_user')]
    public function index(EntityManagerInterface $entityManager): Response
    {
		$user = $entityManager->getRepository(User::class)->findall();

		$arr = [];
		foreach ($user as $user) {
			$arr[] = [
				'id' => $user->getId(),
				'email' => $user->getEmail(),
				'firstName' => $user->getFirstName(),
				'lastName' => $user->getLastName(),
				'role' => $user->getRole(),
				'password' => $user->getPassword(),
				'phone' => $user->getPhone(),
				'address' => $user->getaddress(),
				'country' => $user->getCountry()
			];
		}

		$response = new Response();
		$response->setContent(json_encode($arr));
		$response->headers->set('Content-Type', 'application/json');
		return $response;
    }

	// user by id
	#[Route('/user/{id}', name: 'app_user', methods: ['GET'])]
	public function show(EntityManagerInterface $entityManager, int $id): Response
	{
		$user = $entityManager->getRepository(User::class)->find($id);

		$response = new Response();
		$response->setContent(json_encode([
			'id' => $user->getId(),
			'email' => $user->getEmail(),
			'firstName' => $user->getFirstName(),
			'lastName' => $user->getLastName(),
			'role' => $user->getRole(),
			'password' => $user->getPassword(),
			'phone' => $user->getPhone(),
			'address' => $user->getAddress(),
			'country' => $user->getCountry()
		]));
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}

	// Post to create new user
	#[Route('/user', name: 'app_user_create', methods: ['POST'])]
	public function create(EntityManagerInterface $entityManager): Response
	{
		// get name and parent from request
		$request = Request::createFromGlobals();
		$data = json_decode($request->getContent(), true);

		$email = $data['email'] ?? null;
		$firstName = $data['firstName'] ?? null;
		$lastName = $data['lastName'] ?? null;
		$role = $data['role'] ?? null;
		$password = $data['password'] ?? null;
		$phone = $data['phone'] ?? null;
		$address = $data['address'] ?? null;
		$country = $data['country'] ?? null;

		$user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
		if ($user) {
			$response = new Response();
			$response->setContent(json_encode([
				'status' => false,
				'error' => 'email already exists'
			]));
			$response->headers->set('Content-Type', 'application/json');
			return $response;
		}

		$user = new User();
		$user->setEmail($data['email']);
		$user->setFirstName($data['firstName']);
		$user->setLastName($data['lastName']);
		$user->setRole($data['role']);
		$user->setPassword($data['password']);
		$user->setPhone($data['phone']);
		$user->setAddress($data['address']);
		$user->setCountry($data['country']);

		$entityManager->persist($user);
		$entityManager->flush();

		$response = new Response();
		$response->setContent(json_encode([
			'id' => $user->getId(),
			'email' => $user->getEmail(),
			'firstName' => $user->getFirstName(),
			'lastName' => $user->getLastName(),
			'role' => $user->getRole(),
			'password' => $user->getPassword(),
			'phone' => $user->getPhone(),
			'address' => $user->getAddress(),
			'country' => $user->getCountry()
		]));
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}

	// Delete a user
	#[Route('/user/{id}', name: 'app_user_delete', methods: ['DELETE'])]
	public function delete(EntityManagerInterface $entityManager, int $id): Response
	{
		$user = $entityManager->getRepository(User::class)->find($id);

		if (!$user) {
			$response = new Response();
			$response->setContent(json_encode([
				'status' => false,
				'error' => 'User not found'
			]));
			$response->headers->set('Content-Type', 'application/json');
			return $response;
		}

		$entityManager->remove($user);
		$entityManager->flush();

		$response = new Response();
		$response->setContent(json_encode([
			'status' => true
		]));
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}

	// Patch to update user
	#[Route('/user/{id}', name: 'app_user_update', methods: ['PATCH'])]
	public function update(EntityManagerInterface $entityManager, int $id): Response
	{
		$user = $entityManager->getRepository(User::class)->find($id);

		if (!$user) {
			$response = new Response();
			$response->setContent(json_encode([
				'status' => false,
				'error' => 'User not found'
			]));
			$response->headers->set('Content-Type', 'application/json');
			return $response;
		}

		// get name and parent from request
		$request = Request::createFromGlobals();
		$data = json_decode($request->getContent(), true);

		$user->setEmail($data['email']);
		$user->setFirstName($data['firstName']);
		$user->setLastName($data['lastName']);
		$user->setRole($data['role']);
		$user->setPassword($data['password']);
		$user->setPhone($data['phone']);
		$user->setaddress($data['address']);
		$user->setCountry($data['country']);

		$entityManager->persist($user);
		$entityManager->flush();

		$response = new Response();
		$response->setContent(json_encode([
			'id' => $user->getId(),
			'email' => $user->getEmail(),
			'firstName' => $user->getFirstName(),
			'lastName' => $user->getLastName(),
			'role' => $user->getRole(),
			'password' => $user->getPassword(),
			'phone' => $user->getPhone(),
			'address' => $user->getaddress(),
			'country' => $user->getCountry()
		]));
		$response->headers->set('Content-Type', 'application/json');
		return $response;
	}
}

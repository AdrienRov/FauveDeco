<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;


class UserController extends AbstractController
{
	#[Route('/user/self', name: 'app_test', methods: ['GET'])]
	public function show_self(#[CurrentUser] ?User $user): Response
	{
		$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

		return $this->json($user->serializeAll());
	}

    #[Route('/users', name: 'app_users')]
    public function index(EntityManagerInterface $entityManager): Response
    {
		$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

		$user = $entityManager->getRepository(User::class)->findall();

		$arr = [];
		foreach ($user as $user) {
			$arr[] = $user->serializeAll();
		}

		return $this->json($arr);
    }

	// user by id
	#[Route('/user/{id}', name: 'app_user', methods: ['GET'])]
	public function show(EntityManagerInterface $entityManager, int $id): Response
	{
		$user = $entityManager->getRepository(User::class)->find($id);

		if (!$user) {
			return $this->json([
				'status' => false,
				'error' => 'User not found'
			]);
		}

		return $this->json($user->serializeAll());
	}

	// Authentification
	#[Route('/login', name: 'app_login', methods: ['POST'])]
	public function login(#[CurrentUser] ?User $user): Response
	{
		if (!$user) {
			return $this->json([
				'status' => false,
				'error' => 'User not found'
			]);
		}

		return $this->json([
			"status" => true
		]);
	}

	#[Route('/logout', name: 'app_logout', methods: ['GET'])]
	public function logout(#[CurrentUser] ?User $user, Security $security): Response
	{
		if (!$user) {
			return $this->json([
				'status' => false,
				'error' => 'User not found'
			]);
		}



		return $this->json([
			"status" => true
		]);
	}

	#[Route('/register', name: 'app_register', methods: ['POST'])]
	public function register(MailerInterface $mailer,EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
	{
		// get name and parent from request
		$request = Request::createFromGlobals();
		$data = json_decode($request->getContent(), true);

		$requiredKeys = ['email', 'firstName', 'lastName', 'password', 'phone', 'address', 'country'];

		foreach ($requiredKeys as $key) {
			if (!isset($data[$key])) {
				return $this->json([
					'status' => false,
					'error' => "Missing or invalid key: $key",
				]);
			}
		}

		// if email already exists
		$user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
		if ($user && $user->getRole() != 0) {
			return $this->json([
				'status' => false,
				'error' => 'Email already exists'
			]);
		}

		$user = $user ?? new User();
		
		$user->setEmail($data['email']);
		$user->setFirstName($data['firstName']);
		$user->setLastName($data['lastName']);
		$user->setRole(1);
		$user->setPhone($data['phone']);
		$user->setAddress($data['address']);
		$user->setCountry($data['country']);

		$hashed_password = $passwordHasher->hashPassword(
			$user,
			$data['password']
		);
		$user->setPassword($hashed_password);

		$entityManager->persist($user);
		$entityManager->flush();
		$email = (new TemplatedEmail())
        ->from(new Address('commandes@fauvedeco.fr', 'FauveDeco'))
        ->to($user->getEmail())  // Utilisez l'email de l'utilisateur
        ->subject('Confirmation de création de compte')
        ->htmlTemplate('emails/inscription.twig')
        ->context([
            'firstname' => $user->getFirstName(),
            'lastname' => $user->getLastName(),
            // Vous pouvez ajouter d'autres détails si nécessaire
        ]);

    	$mailer->send($email);
		return $this->json($user->serializeAll());
	}

	#[Route('/user', name: 'app_user_create', methods: ['POST'])]
	public function create( EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): Response
	{
		$this->denyAccessUnlessGranted('ROLE_ADMIN');

		$request = Request::createFromGlobals();
		$data = json_decode($request->getContent(), true);

		$requiredKeys = ['email', 'firstName', 'lastName', 'role', 'password', 'phone', 'address', 'country'];

		foreach ($requiredKeys as $key) {
			if (!isset($data[$key])) {
				return $this->json([
					'status' => false,
					'error' => "Missing or invalid key: $key",
				]);
			}
		}

		$user = new User();
		$user->setEmail($data['email']);
		$user->setFirstName($data['firstName']);
		$user->setLastName($data['lastName']);
		$user->setRole($data['role']);
		$user->setPhone($data['phone']);
		$user->setAddress($data['address']);
		$user->setCountry($data['country']);

		$hashed_password = $passwordHasher->hashPassword(
			$user,
			$data['password']
		);
		$user->setPassword($hashed_password);

		$entityManager->persist($user);
		$entityManager->flush();
		return $this->json($user->serializeAll());
	}

	// Delete a user
	#[Route('/user/{id}', name: 'app_user_delete', methods: ['DELETE'])]
	public function delete(EntityManagerInterface $entityManager, int $id): Response
	{
		$this->denyAccessUnlessGranted('ROLE_ADMIN');
		$user = $entityManager->getRepository(User::class)->find($id);

		if (!$user) {
			return $this->json([
				'status' => false,
				'error' => 'User not found'
			]);
		}

		$entityManager->remove($user);
		$entityManager->flush();

		return $this->json([
			'status' => true,
			'message' => 'User deleted'
		]);
	}

	#[Route('/contact', name: 'app_user_contact', methods: ['POST'])]
	public function contact(MailerInterface $mailer): Response
	{
		// get name and parent from request
		$request = Request::createFromGlobals();
		$data = json_decode($request->getContent(), true);
		$name = $data['name'];
		$mail = $data['mail'];
		$message = $data['message'];

		$email = (new TemplatedEmail())
            ->from(new Address($mail, 'Contact client'))
            ->to('contact@fauvedeco.fr')  
            ->subject('Nouveau message de contact')	
            ->htmlTemplate('emails/contact.twig')
            ->context([
				'mail' => $mail,
                'name' => $name,
                'message' => $message
            ]);
        $mailer->send($email);
		return $this->json([
			'status' => true,
			'message' => 'Message envoyé'
		]);
	}

	// Patch to update user
	#[Route('/user/{id}', name: 'app_user_update', methods: ['PATCH'])]
	public function update(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, int $id): Response
	{
		$thisUser = $this->getUser();
		if (!$thisUser) {
			return $this->json([
				'status' => false,
				'error' => 'You can only update your own account'
			]);
		}
		$user = $entityManager->getRepository(User::class)->find($id);

		if (!$user) {
			return $this->json([
				'status' => false,
				'error' => 'User not found'
			]);
		}

		if ($thisUser->getId() != $user->getId()) {
			$this->denyAccessUnlessGranted('ROLE_ADMIN');
		}

		// get name and parent from request
		$request = Request::createFromGlobals();
		$data = json_decode($request->getContent(), true);

		if (isset($data['email'])) {
			$user->setEmail($data['email']);
		}
		if (isset($data['firstName'])) {
			$user->setFirstName($data['firstName']);
		}
		if (isset($data['lastName'])) {
			$user->setLastName($data['lastName']);
		}
		if (isset($data['role'])) {
			$this->denyAccessUnlessGranted('ROLE_ADMIN');
			$user->setRole($data['role']);
		}
		if (isset($data['phone'])) {
			$user->setPhone($data['phone']);
		}
		if (isset($data['address'])) {
			$user->setAddress($data['address']);
		}
		if (isset($data['country'])) {
			$user->setCountry($data['country']);
		}
		if (isset($data['password'])) {
			$hashed_password = $passwordHasher->hashPassword(
				$user,
				$data['password']
			);
			$user->setPassword($hashed_password);
		}

		$entityManager->persist($user);
		$entityManager->flush();

		return $this->json($user->serializeAll());
	}
}

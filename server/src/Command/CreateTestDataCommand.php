<?php
namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\User;
use App\Entity\Order;
use App\Entity\ProductOrder;
use App\Entity\Image;


#[AsCommand(name: 'app:create-test-data')]
class CreateTestDataCommand extends Command
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        parent::__construct();

        $this->passwordHasher = $passwordHasher;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln('Creating test data...');
        $entityManager = $this->getApplication()->getKernel()->getContainer()->get('doctrine')->getManager();

        mt_srand(42);

        // wipe the database
        $entityManager->getConnection()->executeQuery('TRUNCATE TABLE "order" cascade');
        $entityManager->getConnection()->executeQuery('TRUNCATE TABLE product_order cascade');
        $entityManager->getConnection()->executeQuery('TRUNCATE TABLE product cascade');
        $entityManager->getConnection()->executeQuery('TRUNCATE TABLE category cascade');
        $entityManager->getConnection()->executeQuery('TRUNCATE TABLE image cascade');
        $entityManager->getConnection()->executeQuery('TRUNCATE TABLE "user" cascade');

        // create categories
        $categories = [
            [ "name" => "Cuisine", "parent" => null ],
            [ "name" => "Electroménager", "parent" => null ],
            [ "name" => "Cuisson", "parent" => 1 ],
            [ "name" => "Froid", "parent" => 1 ],
            [ "name" => "Lavage", "parent" => 1 ],
            [ "name" => "Cuisinière", "parent" => 3 ],
            [ "name" => "Four", "parent" => 3 ],
            [ "name" => "Micro-ondes", "parent" => 3 ],
            [ "name" => "Réfrigérateur", "parent" => 4 ],
            [ "name" => "Congélateur", "parent" => 4 ],
            [ "name" => "Lave-linge", "parent" => 5 ],
            [ "name" => "Sèche-linge", "parent" => 5 ],
            [ "name" => "Lave-vaisselle", "parent" => 5 ],
            [ "name" => "Cafetière", "parent" => 2 ],
            [ "name" => "Bouilloire", "parent" => 2 ],
            [ "name" => "Grille-pain", "parent" => 2 ],
            [ "name" => "Robot de cuisine", "parent" => 2 ],
            [ "name" => "Mixeur", "parent" => 2 ],
            [ "name" => "Centrifugeuse", "parent" => 2 ],
            [ "name" => "Presse-agrumes", "parent" => 2 ],
            [ "name" => "Friteuse", "parent" => 2 ],
            [ "name" => "Appareil à raclette", "parent" => 2 ],
            [ "name" => "Appareil à fondue", "parent" => 2 ],
            [ "name" => "Gaufrier", "parent" => 2 ],
            [ "name" => "Croque-monsieur", "parent" => 2 ],
            [ "name" => "Plancha", "parent" => 2 ],
            [ "name" => "Barbecue", "parent" => 2 ]
        ];

        $categoryEntities = [];
        foreach ($categories as $category) {
            $categoryEntity = new Category();
            $categoryEntity->setName($category["name"]);
            $categoryEntity->setParent($categoryEntities[$category["parent"]] ?? null); // $categoryEntities[null] = null, $categoryEntities[0] = null, $categoryEntities[1] = $categoryEntities[0
            $entityManager->persist($categoryEntity);
            $categoryEntities[] = $categoryEntity;
        }

        $num = 100;
        $products = [];

        for ($i = 0; $i < $num; $i++) {
            $products[] = [
                "name" => "Product $i",
                "price" => rand(1000, 100000) / 100,
                "description" => "Description of product $i",
                "quantity" => rand(10, 1000),
                "category" => rand(1, count($categoryEntities))
            ];
        }

        $productEntities = [];
        foreach ($products as $product) {
            $productEntity = new Product();
            $productEntity->setName($product["name"]);
            $productEntity->setPrice($product["price"]);
            $productEntity->setDescription($product["description"]);
            $productEntity->setQuantity($product["quantity"]);
            $productEntity->setCategory($categoryEntities[$product["category"] - 1]);
            $productEntities[] = $productEntity;
            $entityManager->persist($productEntity);

            // create images
            $num = rand(1, 5);
            $sz = rand(40, 400);
            for ($i = 0; $i < $num; $i++) {
                $rnd = rand(1, 100000);
                $image = new Image();
                $image->setUrl("https://picsum.photos/seed/$rnd/$sz/$sz");
                $image->setProduct($productEntity);
                $entityManager->persist($image);
            }

        }

        // create users
        $users = [
            [ "email" => "admin@localhost", "firstName" => "Admin", "lastName" => "Admin", "role" => 1, "password" => "admin", "phone" => "0123456789", "address" => "1 rue de l'admin", "country" => "France" ],
            [ "email" => "user@localhost", "firstName" => "User", "lastName" => "User", "role" => 2, "password" => "user", "phone" => "0123456789", "address" => "1 rue de l'user", "country" => "France" ]
        ];

        $userEntities = [];
        foreach ($users as $user) {
            $userEntity = new User();
            $userEntity->setEmail($user["email"]);
            $userEntity->setFirstName($user["firstName"]);
            $userEntity->setLastName($user["lastName"]);
            $userEntity->setRole($user["role"]);
            $userEntity->setPhone($user["phone"]);
            $userEntity->setAddress($user["address"]);
            $userEntity->setCountry($user["country"]);

            $hashed_password = $this->passwordHasher->hashPassword(
                $userEntity,
                $user["password"]
            );
            $userEntity->setPassword($hashed_password);
            $userEntities[] = $userEntity;
            $entityManager->persist($userEntity);
        }

        // create orders
        $num = 20;

        for ($i = 0; $i < $num; $i++) {
            $order = new Order();
            $order->setDate(new \DateTime('now'));
            $order->setType(rand(0, 1));
            $order->setStatus(rand(0, 1));
            $order->setClient($userEntities[rand(0, count($userEntities) - 1)]);

            $total = 0;

            for ($j = 0; $j < rand(1, 5); $j++) {
                $productOrder = new ProductOrder();
                $productOrder->setProduct($productEntities[rand(0, count($productEntities) - 1)]);
                $productOrder->setQuantity(rand(1, 5));
                $productOrder->setInOrder($order);
                $order->addProductOrder($productOrder);
                $total += $productOrder->getProduct()->getPrice() * $productOrder->getQuantity();
            }
           
            $order->setTotal($total);

            $entityManager->persist($order);
        }

        $entityManager->flush();
        

        return Command::SUCCESS;
    }
}
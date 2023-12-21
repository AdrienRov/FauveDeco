<?php

namespace App\Entity;

use App\Repository\ProductOrderRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductOrderRepository::class)]
class ProductOrder
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $quantity = null;

    #[ORM\ManyToOne(inversedBy: 'productOrders', targetEntity: Product::class, cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\ManyToOne(inversedBy: 'productOrders', targetEntity: Order::class, cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Order $in_order = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(Product $product): static
    {
        $this->product = $product;

        return $this;
    }

    public function getInOrder(): ?Order
    {
        return $this->in_order;
    }

    public function setInOrder(?Order $in_order): static
    {
        $this->in_order = $in_order;

        return $this;
    }

    public function serialize(): array
    {
        $total = 0;

        $total += $this->getProduct()->getPrice() * $this->getQuantity();

        $total = round($total, 2);
        
        return [
            'id' => $this->getId(),
            'quantity' => $this->getQuantity(),
            'product' => $this->getProduct()->serialize(),
            'total' => $total,
        ];
    }

    public function serializeAll(): array
    {
        $data = $this->serialize();

        $data['inOrder'] = $this->getInOrder()->serialize();

        return $data;
    }
}

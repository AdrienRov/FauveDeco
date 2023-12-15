<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Mapping\ClassMetadata;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $type = null;

    #[ORM\Column(type: Types::SMALLINT)]
    private ?int $status = null;

    #[ORM\OneToMany(mappedBy: 'in_order', targetEntity: ProductOrder::class, cascade: ['persist'], orphanRemoval: true)]
    private Collection $productOrders;

    #[ORM\ManyToOne(inversedBy: 'orders')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $client = null;

    public function __construct()
    {
        $this->productOrders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getType(): ?int
    {
        return $this->type;
    }

    public function setType(int $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): static
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection<int, ProductOrder>
     */
    public function getProductOrders(): Collection
    {
        return $this->productOrders;
    }

    public function addProductOrder(ProductOrder $productOrder): static
    {
        if (!$this->productOrders->contains($productOrder)) {
            $this->productOrders->add($productOrder);
            $productOrder->setInOrder($this);
        }

        return $this;
    }

    public function removeProductOrder(ProductOrder $productOrder): static
    {
        if ($this->productOrders->removeElement($productOrder)) {
            // set the owning side to null (unless already changed)
            if ($productOrder->getInOrder() === $this) {
                $productOrder->setInOrder(null);
            }
        }

        return $this;
    }

    public function getClient(): ?User
    {
        return $this->client;
    }

    public function setClient(?User $client): static
    {
        $this->client = $client;

        return $this;
    }

    public static function loadValidatorMetadata(ClassMetadata $metadata): void
    {
        $metadata->addPropertyConstraint('date', new Assert\NotNull());
        //$metadata->addPropertyConstraint('date', new Assert\DateTime());

        $metadata->addPropertyConstraint('total', new Assert\NotNull());
        $metadata->addPropertyConstraint('total', new Assert\PositiveOrZero());

        $metadata->addPropertyConstraint('type', new Assert\NotNull());
        $metadata->addPropertyConstraint('type', new Assert\Positive());

        $metadata->addPropertyConstraint('status', new Assert\NotNull());
        $metadata->addPropertyConstraint('status', new Assert\Positive());

        $metadata->addPropertyConstraint('client', new Assert\NotNull());

        $metadata->addPropertyConstraint('productOrders', new Assert\NotNull());
        $metadata->addPropertyConstraint('productOrders', new Assert\Count(min: 1));
    }

    public function serialize(): array
    {
        return [
            'id' => $this->getId(),
            'date' => $this->getDate()->format('Y-m-d H:i:s'),
            'type' => $this->getType(),
            'status' => $this->getStatus(),
            'productOrders' => $this->serializeProductOrders()
        ];
    }

    public function serializeProductOrders(): array
    {
        $result = [];

        foreach ($this->getProductOrders() as $productOrder) {
            $result[] = $productOrder->serialize();
        }

        return $result;
    }

    public function serializeAll(): array
    {
        $data = $this->serialize();

        $data['client'] = $this->getClient()->serialize();
        
        return $data;
    }
}

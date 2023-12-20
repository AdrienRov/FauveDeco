import React, { useEffect, useState } from "react";


function Termes() {
    return (
        <div class="py-6 px-6">
            <div className="collapse collapse-arrow bg-base-200 my-6">
                <input type="radio" name="my-accordion-2" checked="checked" />
                <div className="collapse-title text-xl font-medium">
                    <h1 class="text-3xl font-bold mb-4 ml-10">Termes et Conditions Générales d'inscription</h1>
                </div>
                <div className="collapse-content">
                    <div class="container mx-auto p-8">

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">1. Acceptation des conditions</h2>
                            <p>En utilisant ce site web et en vous inscrivant en tant qu'utilisateur, vous acceptez de vous conformer aux présentes conditions générales. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">2. Inscription et compte utilisateur</h2>
                            <p class="mb-2">2.1 En vous inscrivant sur notre site de vente de décorations, vous garantissez que les informations fournies sont exactes, complètes et à jour. Vous acceptez de maintenir et de mettre à jour vos informations personnelles de manière à les garder exactes, complètes et à jour.</p>
                            <p>2.2 Vous êtes responsable de la confidentialité de votre mot de passe et de votre compte, et vous acceptez de ne pas partager ces informations avec des tiers. Vous êtes entièrement responsable de toutes les activités qui se produisent sous votre compte.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">3. Utilisation du site</h2>
                            <p class="mb-2">3.1 Vous acceptez d'utiliser le site uniquement à des fins légales et conformément à ces conditions générales.</p>
                            <p>3.2 Vous acceptez de ne pas utiliser le site d'une manière qui pourrait endommager, désactiver, surcharger ou compromettre nos serveurs, réseaux ou systèmes de sécurité, ou interférer avec l'utilisation et la jouissance du site par d'autres utilisateurs.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">4. Commandes et paiement</h2>
                            <p class="mb-2">4.1 En passant une commande sur notre site, vous déclarez avoir l'âge légal pour conclure un contrat et acceptez d'être lié par les présentes conditions.</p>
                            <p>4.2 Les prix des produits sont indiqués sur le site. Des frais d'expédition et des taxes peuvent s'appliquer. Vous acceptez de payer le montant total de la commande, y compris les frais supplémentaires.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">5. Livraison et retours</h2>
                            <p class="mb-2">5.1 Les délais de livraison sont estimés et peuvent varier. Nous ne sommes pas responsables des retards indépendants de notre volonté.</p>
                            <p>5.2 Consultez notre politique de retour pour des informations sur les retours et les remboursements.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">6. Propriété intellectuelle</h2>
                            <p class="mb-2">6.1 Le contenu du site, y compris les images, les textes et les logos, est protégé par des droits d'auteur et d'autres droits de propriété intellectuelle.</p>
                            <p>6.2 Vous n'avez pas le droit de reproduire, distribuer, afficher publiquement, modifier ou utiliser le contenu du site à des fins commerciales sans notre autorisation écrite.</p>
                        </section>

                    </div>

                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-6">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    <h1 class="text-3xl font-bold mb-4">Conditions Générales de Vente</h1>
                </div>
                <div className="collapse-content">
                    <div class="container mx-auto p-8">

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">1. Champ d'application</h2>
                            <p>Les présentes conditions générales de vente s'appliquent à toutes les ventes de produits effectuées par <strong>fauve DECORATION</strong> sur le site internet <a href="https://fauve-decoration.com" class="text-blue-500">fauve-decoration.com</a>.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">2. Produits</h2>
                            <p class="mb-2">2.1 Les produits proposés à la vente sont décrits et présentés avec la plus grande précision possible. Cependant, des erreurs peuvent survenir, et nous ne pouvons garantir l'exactitude de toutes les descriptions.</p>
                            <p>2.2 Les photographies des produits ne sont pas contractuelles et n'engagent pas <strong>fauve DECORATION</strong> à les reproduire à l'identique.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">3. Prix</h2>
                            <p>Les prix des produits sont indiqués en euros et sont susceptibles d'être modifiés à tout moment. Les frais de livraison ne sont pas inclus dans le prix affiché et sont précisés lors du processus de commande.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">3. Prix</h2>
                            <p>Les prix des produits sont indiqués en euros et sont susceptibles d'être modifiés à tout moment. Les frais de livraison ne sont pas inclus dans le prix affiché et sont précisés lors du processus de commande.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">3. Prix</h2>
                            <p>Les prix des produits sont indiqués en euros et sont susceptibles d'être modifiés à tout moment. Les frais de livraison ne sont pas inclus dans le prix affiché et sont précisés lors du processus de commande.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">3. Prix</h2>
                            <p>Les prix des produits sont indiqués en euros et sont susceptibles d'être modifiés à tout moment. Les frais de livraison ne sont pas inclus dans le prix affiché et sont précisés lors du processus de commande.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">3. Prix</h2>
                            <p>Les prix des produits sont indiqués en euros et sont susceptibles d'être modifiés à tout moment. Les frais de livraison ne sont pas inclus dans le prix affiché et sont précisés lors du processus de commande.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">3. Prix</h2>
                            <p>Les prix des produits sont indiqués en euros et sont susceptibles d'être modifiés à tout moment. Les frais de livraison ne sont pas inclus dans le prix affiché et sont précisés lors du processus de commande.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">3. Prix</h2>
                            <p>Les prix des produits sont indiqués en euros et sont susceptibles d'être modifiés à tout moment. Les frais de livraison ne sont pas inclus dans le prix affiché et sont précisés lors du processus de commande.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">10. Droit applicable et juridiction compétente</h2>
                            <p>Les présentes conditions générales de vente sont régies par le droit français. Tout litige relatif à leur interprétation et à leur exécution relève des tribunaux français.</p>
                        </section>

                    </div>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-6">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    <h1 class="text-3xl font-bold mb-4">Mentions Légales</h1>
                </div>
                <div className="collapse-content">
                    <div class="container mx-auto p-8">

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">Éditeur</h2>
                            <p>Ce site est édité par l'Université du Havre - IUT du Havre.</p>
                            <p>Siège social : Rue Boris Vian 76610 Le Havre</p>
                            <p>Numéro de téléphone : 01 23 45 56 78</p>
                            <p>Adresse e-mail : <a href="mailto:moi@moi.moi" class="text-blue-500">moi@moi.moi</a></p>
                            <p>Numéro d'immatriculation : [Numéro d'immatriculation]</p>
                            <p>Directeur de la publication : [Nom du directeur de la publication]</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">Hébergeur</h2>
                            <p>Ce site est hébergé par [Nom de l'hébergeur].</p>
                            <p>Adresse de l'hébergeur : [Adresse de l'hébergeur]</p>
                            <p>Numéro de téléphone de l'hébergeur : [Numéro de téléphone de l'hébergeur]</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">Propriété intellectuelle</h2>
                            <p> L'ensemble du contenu de ce site, incluant, de manière non exhaustive, les textes, graphismes, logos, images, clips audio, clips vidéo, et icônes, ainsi que leur mise en forme, sont la propriété exclusive de [Nom de l'entreprise] à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.</p>
                            <p>Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces éléments est strictement interdite sans l'accord exprès par écrit de [Nom de l'entreprise].</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">Contact</h2>
                            <p>Pour toute question ou information concernant le site, veuillez nous contacter à l'adresse suivante : <a href="mailto:[Adresse e-mail de contact]" class="text-blue-500">[Adresse e-mail de contact]</a></p>
                        </section>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Termes;
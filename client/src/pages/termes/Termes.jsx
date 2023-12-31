import React, { useEffect, useState } from "react";


function Termes() {
    return (
        <div class="py-6 px-6">
            <div className="collapse collapse-arrow bg-base-200 my-6">
                <input type="radio" name="my-accordion-2" checked="checked" />
                <div className="collapse-title text-xl font-medium">
                    <h1 class="text-3xl font-bold mb-4">Termes et Conditions Générales d'inscription</h1>
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
                            <h2 class="text-2xl font-bold mb-2">4. Commandes</h2>
                            <p>4.1 Les commandes sont effectuées en ligne via le site internet. L'utilisateur doit créer un compte et fournir des informations exactes pour finaliser sa commande.</p>
                            <p>4.2 <strong>fauve DECORATION</strong> se réserve le droit de refuser toute commande pour des motifs légitimes, notamment en cas de problème d'approvisionnement, de difficulté concernant la commande reçue ou de litige antérieur avec le client.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">5. Paiement</h2>
                            <p>5.1 Les paiements sont effectués en ligne par Up 2 Pay.</p>
                            <p>5.2 La commande est considérée comme valide après confirmation du paiement.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">6. Livraison</h2>
                            <p>6.1 Les délais de livraison sont estimés et peuvent varier. <strong>fauve DECORATION</strong> ne peut être tenu responsable des retards indépendants de sa volonté.</p>
                            <p>6.2 En cas de non-conformité d'un produit livré, le client dispose d'un délai de 180 jours à compter de la réception pour signaler le problème à <strong>fauve DECORATION</strong>.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">7. Droit de rétractation</h2>
                            <p>Le client dispose d'un délai de [nombre de jours] jours à compter de la réception des produits pour exercer son droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">8. Garanties</h2>
                            <p>Les produits vendus sont garantis conformes aux dispositions légales en vigueur. <strong>fauve DECORATION</strong> ne saurait être tenu responsable des dommages résultant d'une utilisation inappropriée des produits.</p>
                        </section>

                        <section class="mb-8">
                            <h2 class="text-2xl font-bold mb-2">9. Responsabilité</h2>
                            <p>9.1 <strong>fauve DECORATION</strong> décline toute responsabilité en cas d'utilisation inappropriée des produits vendus sur le site.</p>
                            <p>9.2 Les produits sont destinés à un usage conforme à leur description. <strong>fauve DECORATION</strong> ne peut être tenu responsable des dommages résultant d'une utilisation des produits contraire à leur destination ou en violation des instructions fournies.</p>
                            <p>9.3 <strong>fauve DECORATION</strong> ne peut être tenu responsable des dommages indirects, consécutifs, spéciaux ou accidentels résultant de l'utilisation des produits, y compris, mais sans s'y limiter, la perte de profits, la perte de données ou tout autre préjudice financier ou commercial, même si <strong>fauve DECORATION</strong> a été informé de la possibilité de tels dommages.</p>
                            <p>9.4 En tout état de cause, la responsabilité totale de <strong>fauve DECORATION</strong> envers le client, pour quelque réclamation que ce soit, ne dépassera en aucun cas le montant total payé par le client pour le produit en question.</p>
                            <p>9.5 Les limitations de responsabilité énoncées dans les présentes conditions générales s'appliquent dans toute la mesure permise par la loi applicable.</p>
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
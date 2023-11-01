import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Testimonial from './TestimonialItem/TestimonialItem';

const testimonials = [
  { name: 'Laura', rating: 5, comment: 'J\'ai récemment commandé un maillot de football sur ce site e-commerce, et je suis vraiment impressionnée par la qualité du produit. Non seulement il est conforme à la description, mais il est également arrivé dans les délais prévus. Je suis ravie de mon achat et je recommande vivement ce site à tous les fans de football !' },
  { name: 'David', rating: 4, comment: 'Le maillot que j ai acheté sur ce site est tout simplement génial. La commande était simple, le prix était compétitif, et la livraison a été rapide. Le maillot est de grande qualité, avec des couleurs vives et une coupe parfaite. C est devenu mon site de référence pour tous mes besoins en équipement de football.' },
  { name: 'Antoine', rating: 4.5, comment: 'Le maillot que j ai commandé sur ce site e-commerce est tout ce que je pouvais espérer. La qualité est exceptionnelle, et il est livré avec tous les détails authentiques. De plus, le service client est très réactif en cas de questions. Je suis extrêmement satisfait de mon achat et je vais certainement revenir pour en acheter d autres.' },
  { name: 'Émilie', rating: 4, comment: 'J ai acheté un maillot pour mon fils sur ce site e-commerce, et il est aux anges. La taille correspond parfaitement, et la livraison a été rapide. Le maillot est confortable et résistant, ce qui est essentiel pour un jeune joueur de football. C est un excellent site pour les fans de tous âges.' },
  // Ajoutez d'autres témoignages
];

function Temoignages ()  {
    return(
  <Container>
     <h2 className='text-center mt-5'> Temoigniages : </h2>
    <Row>
      {testimonials.map((testimonial, index) => (
        <Col key={index} md={3}  sm={12} className="mb-3">
          <Testimonial {...testimonial} />
        </Col>
      ))}
    </Row>
  </Container>
    )
};

export default Temoignages;

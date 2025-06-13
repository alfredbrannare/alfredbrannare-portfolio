import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui';

const Projects = () => {
  return (
    <section>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/3">
            ...
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            ...
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            ...
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export { Projects };

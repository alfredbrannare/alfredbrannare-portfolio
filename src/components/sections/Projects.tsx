import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui';

const Projects = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-6 px-4">
      <h1 className="text-5xl font-bold text-amber-500 mb-6 text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
        Projects
      </h1>
      <Carousel>
        <CarouselContent>
          <CarouselItem className="basis-1/3">
            Coming soon...
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            Coming soon...
          </CarouselItem>
          <CarouselItem className="basis-1/3">
            Coming soon...
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export { Projects };

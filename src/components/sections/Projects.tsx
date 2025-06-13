import Image from 'next/image';
import { projects } from '@/data/projects';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui';

const Projects = () => {
  const sortedProjects = [...projects].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  return (
    <section className="flex flex-col justify-center items-center mt-6 px-4">
      <h1 className="text-5xl font-bold text-amber-500 mb-6 text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
        Projects
      </h1>
      <Carousel>
        <CarouselContent>
          {sortedProjects.map((project) => (
            <CarouselItem
              className="basis-1/3"
              key={project.id}
            >
              <div className="flex flex-col justify-center items-center text-center">
                <span>{project.date}</span>
                <span
                  className="bg-amber-400 w-5 h-5 rounded-full block my-6"
                  aria-hidden="true"
                />
                <span>{project.title}</span>
              </div>
              <Image
                src={project.image}
                alt={`Image of ${project.title}`}
                className="w-full h-auto object-cover rounded-lg"
                width="600"
                height="400"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export { Projects };

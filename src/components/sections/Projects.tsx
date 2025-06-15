import Image from 'next/image';
import { processedProjects } from '@/utils/getSkill';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui';
import Link from 'next/link';

const Projects = () => {
  const sortedProjects = [...processedProjects].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  return (
    <section
      className="flex flex-col justify-center items-center mt-6 px-4"
      id="projects"
    >
      <h1 className="text-5xl font-bold text-amber-500 mb-6 text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
        Projects
      </h1>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {sortedProjects.map((project, index) => (
            <CarouselItem
              className="basis-full sm:basis-1/2 lg:basis-1/3"
              key={project.id}
            >
              <div className="flex flex-col justify-center items-center text-center">
                <span>{project.date}</span>
                <div className="relative flex items-center justify-center w-full">
                  {index < sortedProjects.length - 1 && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-[calc(100%+1.5rem)] h-0.5 bg-amber-400 z-0" />
                  )}
                  <span
                    className="bg-amber-400 w-5 h-5 rounded-full block my-6"
                    aria-hidden="true"
                  />
                </div>
                <span className="mb-2 items-center text-xs md:text-xl font-semibold">
                  {project.title}
                </span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full">
                    <Image
                      src={project.image}
                      alt={`Image of ${project.title}`}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer shadow-md"
                      width="600"
                      height="400"
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogTitle className="text-xl font-bold">
                    {project.title}
                  </DialogTitle>
                  <Button
                    asChild
                    size="none"
                    variant="link"
                    className="justify-start"
                  >
                    <Link href={project.repoLink}>
                      <span>Github Link</span>
                    </Link>
                  </Button>
                  <Image
                    src={project.image}
                    alt={`Image of ${project.title}`}
                    className="w-full h-48 object-cover rounded-lg mt-4 shadow-md"
                    width="600"
                    height="400"
                  />
                  <div className="flex flex-row mt-2">
                    {project.stack.map((skill, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger>
                          <Image
                            key={index}
                            src={skill.image}
                            alt={`${skill.title} icon`}
                            width="20"
                            height="20"
                            className="min-h-[20px] min-w-[20px] object-contain mb-2 mr-1"
                          />
                          <TooltipContent>
                            {skill.title}
                          </TooltipContent>
                        </TooltipTrigger>
                      </Tooltip>
                    ))}
                  </div>
                  <DialogDescription className="mt-2 text-sm">
                    {project.description}
                  </DialogDescription>
                  <Button asChild size="sm">
                    <Link
                      href={project.deployLink}
                      className="mt-5 text-center px-6 py-6 block"
                    >
                      <span>Visit</span>
                      <span>{project.title}</span>
                    </Link>
                  </Button>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export { Projects };

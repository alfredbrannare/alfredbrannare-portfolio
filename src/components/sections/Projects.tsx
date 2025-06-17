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
  Separator,
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
        orientation="vertical"
        className="w-full max-w-3xl overflow-hidden"
      >
        <CarouselContent className="py-6">
          {sortedProjects.map((project) => (
            <CarouselItem
              className="basis-auto mx-2"
              key={project.id}
            >
              <ol className="relative border-s-2 px-2 border-amber-500 dark:border-gray-700 pb-3">
                <li className="mb-4 ms-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {project.date}
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                </li>
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
              </ol>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Separator className="bg-stone-200 h-1 my-6" />
    </section>
  );
};

export { Projects };

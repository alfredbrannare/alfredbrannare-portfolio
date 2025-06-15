import { processedProjects } from '@/utils/getSkill';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui';

const Footer = () => {
  const portfolio = processedProjects.filter(
    (item) => item.title === 'Portfolio'
  );

  return (
    <footer className="flex flex-col px-4 py-4 bg-primary justify-center text-center">
      <h1 className="text-white">
        This portfolio was designed and built by me using
      </h1>
      <div className="flex flex-wrap mt-2 items-center justify-center">
        {portfolio[0].stack.map((skill, index) => {
          let imageUrl = skill.image;

          if (skill.image.endsWith('/000000')) {
            imageUrl = skill.image.replace(
              '/000000',
              '/FFFFFF'
            );
          } else if (skill.image.endsWith('/111111')) {
            imageUrl = skill.image.replace(
              '/111111',
              '/FFFFFF'
            );
          }

          return (
            <Tooltip key={index}>
              <TooltipTrigger>
                <Image
                  src={imageUrl}
                  alt={`${skill.title} icon`}
                  width={50}
                  height={50}
                  className="max-w-[50px] max-h-[50px] object-contain mb-2 mr-3"
                />
              </TooltipTrigger>
              <TooltipContent>{skill.title}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;

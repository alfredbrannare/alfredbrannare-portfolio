import {getProjects} from "@/features/project/api";
import Image from "next/image";

export default async function ProjectSection() {
    const projects = await getProjects();

    return (
        <section>
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        {project.image && <Image src={project.image} alt={project.title} width={500} height={300} />}
                    </li>
                ))}
            </ul>
        </section>
    )
}
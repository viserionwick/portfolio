// IMPORTS: Essentials
import Link from "next/link";
import Image from "next/image";

// Layout
export { default as Header } from "./layout/Header";
export { default as Content } from "./layout/Content";
export { default as Footer } from "./layout/Footer";

// Headlines
export const H1 = ({ children, className }: {children: React.ReactNode, className?: string}): JSX.Element => {
    return  <h1 className={`c-headline ${className ? className : ""}`}>
                {children} <span />
            </h1>
}

// Project Cards
type ProjectCardType = { 
    name: string,
    stack: { title: string; logo: string }[],
    banner: string,
    slug: string,
    className?: string
}
export const ProjectCard = ({ name, stack, banner, slug, className }: ProjectCardType): JSX.Element => {  
    
    return  <Link href={`/project/${slug}`} className={`c-card ${className ? className : ""}`}>
                <div className="c-card__images">
                    <div className="c-card__stack">
                        {
                            stack && stack.map((tech, i) => (
                                i <= 3 &&
                                <div className="c-card--tech" key={i}>
                                    <Image
                                        src={ tech.logo }
                                        alt={ `projectStackImage_${i+1}` }
                                        width={34}
                                        height={34}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div className="c-card__banner">
                        <Image
                            src={ banner }
                            alt="projectImage"
                            fill
                        />
                    </div>
                </div>
                <h2 className="c-card__name">
                    {name}.
                </h2>
            </Link>
}

type SpotlightProjectCardType = { 
    name: string,
    description: string,
    stack: { title: string; logo: string }[],
    banner: string,
    website?: string | null,
    repository?: string | null,
    slug: string,
    className?: string
}

export const SpotlightProjectCard = ({ name, description, stack, banner, website, repository, slug, className }: SpotlightProjectCardType): JSX.Element => {
    return  <div className={`c-spotlightCard ${className ? className : ""}`}>
                <Link href={`/project/${slug}`} className="c-spotlightCard__images">
                    <div className="c-spotlightCard__stack">
                        {
                            stack && stack.map((tech, i) => ( 
                                i <= 3 &&
                                <div className="c-spotlightCard--tech" key={i}>
                                    <Image
                                        src={ tech.logo }
                                        alt={ `projectStackImage_${i+1}` }
                                        width={34}
                                        height={34}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div className="c-spotlightCard__banner">
                        <Image
                            src={ banner }
                            alt="spotlightProjectImage"
                            fill
                        />
                    </div>
                </Link>
                <div className="c-spotlightCard__details">
                    <div className="c-spotlightCard__info">
                        <Link href={`/project/${slug}`}>
                            <h2 className="c-spotlightCard__name">
                                {name}.
                            </h2>
                        </Link>
                        <p className="c-spotlightCard__description">
                            {description}
                        </p>
                    </div>
                    <div className="c-spotlightCard__buttons">
                        <Link href={`/project/${slug}`} className="c-spotlightCard__buttons--url priButton">details</Link>
                        { 
                            website &&
                            <a href={website} rel="noreferrer" className="c-spotlightCard__buttons--website priButton roundButton">
                                <i className="fa-solid fa-earth-americas" />
                            </a>
                        }
                        { 
                            repository &&
                            <a href={repository} rel="noreferrer" className="c-spotlightCard__buttons--repository priButton roundButton">
                                <i className="fa-brands fa-github" />
                            </a>
                        }
                    </div>
                </div>
            </div>
}



// Vectors
type LaptopVectorType = {
    image: string,
    direction?: string;
    id?: string;
    className?: string;
}

export const LaptopVector = ({image, direction = "right", id, className }: LaptopVectorType): JSX.Element => {
    return  <div className={`c-laptopVector ${className ? className : ""} ${id ? id : ""}`}>
                <div className={`c-laptopVector--wrapper ${direction === "left" ? "left" : direction === "right" ? "right" : ""}`}>
                    <Image
                        src={image}
                        alt="projectImage_desktop"
                        fill
                    />
                    <span />
                </div>
            </div>
}

type PhoneVectorType = {
    image: string,
    direction?: string;
    id?: string;
    className?: string;
}

export const PhoneVector = ({image, direction = "right", id, className }: PhoneVectorType): JSX.Element => {
    return  <div className={`c-phoneVector ${className ? className : ""} ${id ? id : ""}`}>
                <div className={`c-phoneVector--wrapper ${direction === "left" ? "left" : direction === "right" ? "right" : ""}`}>
                    <Image
                        src={image}
                        alt="projectImage_desktop"
                        fill
                    />
                    <span />
                </div>
            </div>
}
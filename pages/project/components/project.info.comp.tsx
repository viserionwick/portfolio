// Essentials
import React, { useRef, useEffect, FunctionComponent } from 'react';
import Image from 'next/image';
import moment from "moment";

// GraphQL
import { AllProps } from "../../_app";


const Project_Info_Component: FunctionComponent<AllProps> = ({ project }) => {

    // Break Title
    const project__name = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        const title = project__name.current;
        const wrapperSize = project__name.current?.parentElement?.parentElement?.offsetWidth;
        if (title && wrapperSize) {
            if (title.offsetWidth > wrapperSize) {
            title.style.wordBreak = "break-all";
            } else {
            title.style.wordBreak = "none";
            }
        }
    }, []);


  return (
    <div className="p-project__info">
        {
            project &&
            <>
                <div className="p-project__date">
                <>{ moment(project.dates.start).format('MMM YYYY') } - { moment(project.dates.end).format('MMM YYYY') }</>
                </div>
                <h1 className="p-project__name" ref={ project__name }>
                    { project.title }
                </h1>
                {
                    project.stack.length >= 1 &&
                    <div className="p-project__stack">
                    {
                    project.stack.map(tech => (
                        <div className="p-project__tech" key={ tech.title }>
                        <Image
                            src={ tech.logo }
                            alt={ tech.title }
                            width={34}
                            height={34}
                        />
                        <span className="p-project--techTooltip">{ tech.title }</span>
                        </div>
                    ))
                    }
                    </div>
                }
            </>
        }
    </div>
  )
}

export default Project_Info_Component
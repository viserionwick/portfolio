// Essentials
import { FunctionComponent } from "react";

// Components
import { LaptopVector, PhoneVector } from "../../../components";

// GraphQL
import { AllProps } from "../../_app";

const Project_Desktop_Images: FunctionComponent<AllProps> = ({ project }) => {
  return (
    <>
      {
        project &&
        <>
          <div className="p-project__laptops">
            { project.desktopImages
              .slice(0, 5)
              .map((image, index) =>
                index === 2 || index === 4 ? (
                  <LaptopVector
                    image={image}
                    direction="left"
                    id={`_${index + 1}`}
                    key={index}
                  />
                ) : (
                  <LaptopVector
                    image={image}
                    direction="right"
                    id={`_${index + 1}`}
                    key={index}
                  />
                )
              )
            }
            <div className="p-project__laptopsWinds">
              <span className="p-project__laptopsWind _1" />
              <span className="p-project__laptopsWind _2" />
              <span className="p-project__laptopsWind _3" />
              <span className="p-project__laptopsWind _4" />
              <span className="p-project__laptopsWind _5" />
            </div>
          </div>
          <div className="p-project__phones">
            { project.mobileImages
              .slice(0, 6)
              .map((image, index) =>
                index === 0 || index === 2 || index === 5 ? (
                  <PhoneVector
                    image={image}
                    direction="left"
                    id={`_${index + 1}`}
                    key={index}
                  />
                ) : (
                  <PhoneVector
                    image={image}
                    direction="right"
                    id={`_${index + 1}`}
                    key={index}
                  />
                )
              )
            }
            <div className="p-project__phonesWinds">
              <span className="p-project__phonesWind _1" />
              <span className="p-project__phonesWind _2" />
              <span className="p-project__phonesWind _3" />
              <span className="p-project__phonesWind _4" />
              <span className="p-project__phonesWind _5" />
              <span className="p-project__phonesWind _6" />
              <span className="p-project__phonesWind _7" />
              <span className="p-project__phonesWind _8" />
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Project_Desktop_Images;

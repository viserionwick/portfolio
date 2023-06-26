// Essentials
import React, { useEffect, useState } from "react";

// Contexts
import { useSettingsContext } from "../../../contexts/settingsContext";
import { sendEmail } from "../../../utils/services/contacts";

// Components
import { DownloadResume, H1 } from "../../index"

const Contact: React.FunctionComponent = () => {

  const settings = useSettingsContext();

  // States
  const work = settings?.work;
  const socialMedia = settings?.socialMedia;
  const maxChar: number = 255;
  const [messageLength, setMessageLength] = useState<number>(maxChar);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  // Handle Input
  const [formData, setFormData] = useState<{
    message: string,
    name: string,
    email: string
  }>({
    message: "",
    name: "",
    email: ""
  });

  const [formDataErrors, setFormDataErrors] = useState<{
    message: boolean,
    name: boolean,
    email: boolean
  }>({
    message: false,
    name: false,
    email: false
  });

  
  // Handle Inputs
  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Set States
    setFormData({ ...formData, [name]: name === "email" ? value.toLowerCase() : value });

    // Disable Errors
    setFormDataErrors({ ...formDataErrors, [name]: false });
  }

  // Calculate Message Length
  useEffect(() => {
    setMessageLength(maxChar - formData.message.length);
  }, [formData]);
  

  // Handle Send Email
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /\s{2,}/g;

    // Check Errors
    let errorCount: number = 0;
    let newFormDataErrors = { ...formDataErrors };

    Object.keys(formData).map(data => {
      const currentInput = formData[data as keyof typeof formData];

      if ( currentInput.replace(regex, ' ').trim() === "" || currentInput === undefined || currentInput.length > maxChar) {
          
        newFormDataErrors = { ...newFormDataErrors, [data]: true };
        
        errorCount ++;
      }

      if (data === "email") {
        const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!currentInput.match(isEmail)) {
          newFormDataErrors = { ...newFormDataErrors, [data]: true };
        
          errorCount ++;
        }
      }
    })

    setFormDataErrors(newFormDataErrors);
    
    // Send
    if (errorCount <= 0) {
      setIsSending(true);
      const contact = await sendEmail(formData.message, formData.name, formData.email);
      console.log(contact);
      
      setIsSending(false);
      setIsSent(true);
    }
  }

  return (
    <section id="contact" className="s-contact">
      <H1>contact</H1>
      {
        isSending ?
        <div className="s-contact__sending">
          <span className="loading" />
        </div>
        :
        isSent ?
        <div className="s-contact__sent">
          Successfully Sent!
          <DownloadResume className="secButton"/>
        </div>
        :
        <>
          <div className="s-contact__workInfo">
            {
              work?.status ?
              <>
                currently working at:
                <br/>
                <a href={work?.companyURL} target="_blank" rel="noreferrer" className="s-contact__workInfo--company link">{ work?.companyName }</a>
                <br/>
                as { work?.position }.
                <br/>
                <br/>
                let&apos;s get in touch to examine availability.
              </>
              :
              <>currently available for work. let&apos;s get in touch.</>
            }
          </div>
          <form onSubmit={handleSubmit} className="s-contact__form priForm">
            <div className="s-contact--message">
              <textarea
                className={formDataErrors.message ? "error" : ""}
                name="message"
                spellCheck="false"
                placeholder="your message."
                value={formData.message}
                onChange={handleInput}
              />
              <span className={`s-contact--messageCounter ${formData.message.length > maxChar ? "max" : ""}`}>{ messageLength }</span>  
            </div>

            <div className="s-contact--info">
              <input
                className={formDataErrors.name ? "error" : ""}
                type="text"
                name="name"
                spellCheck="false"
                autoComplete="off"
                placeholder="your name."
                value={formData.name}
                onChange={handleInput}
              />
              <input
                className={formDataErrors.email ? "error" : ""}
                type="text"
                name="email"
                spellCheck="false"
                autoComplete="off"
                placeholder="your email."
                value={formData.email}
                onChange={handleInput}
              />
              <button className="priButton">send email</button>
            </div>
          </form>
        </>
      }

      
      <div className="s-contact__social">
        {
          socialMedia?.map(link => (
            <a key={ link.name } href={ link.href } target={ link.name !== "email" ? "_blank" : "" } rel="noreferrer" className="s-contact__social--anchor">
              <i className={ link.icon } />
            </a>
          ))
        }
      </div>
    </section>
  )
}

export default Contact
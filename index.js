const coverLetterDiv = document.getElementById("cover-letter-tab-pane");
const resumeDiv = document.getElementById("resume-tab-pane");
coverLetterDiv.innerHTML = "Loading...";
resumeDiv.innerHTML = "Loading...";

const name_ = sessionStorage.getItem("name");
const contact = sessionStorage.getItem("contact");
const skills = sessionStorage.getItem("skills");
const projects = sessionStorage.getItem("projects");
const experience = sessionStorage.getItem("experience");
const profession = sessionStorage.getItem("profession");

console.log({ name_, contact, skills, projects, experience, profession });

sessionStorage.clear();

const getCoverLetter = async (
    name,
    contact,
    skills,
    projects,
    experience,
    profession
) => {
    console.log("inside function getCoverLetter...");

    const url = "https://api.openai.com/v1/completions";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Bearer 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",
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `Behave like a content creatorn and Cover Letter Generator and this is the information: 

Name: ${name}
Contact: ${contact}
Skills: ${skills}
Projects: ${projects}
Year of experience: ${experience}
Who are you: ${profession}
The output will be a cover letter that highlights your skills, projects and fit for the position. You can customize the output by changing the company name, job title and other details as needed.
`,
            temperature: 0,
            max_tokens: 777,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }),
    });

    const data = await response.json();
    console.log(data);
    const coverReponse = data.choices[0].text;

    // console.log(coverPropmptTemplate);
    console.log("--------------------------------");
    console.log(data);
    console.log("--------------------------------");
    console.log(coverReponse);
    coverLetterDiv.innerHTML = coverReponse;
    const resume = `
<link rel="stylesheet" href="css/generate.css" />

<div class="container">
        <div class="left_side">
            <div class="Text">
                <h2>${name}<br><span>${profession}</span></h2>
            </div>
            <div class="contact">
                <h3 class="title">Contact</h3>
                <ul>
                    <li>
                        <span class="text">${contact}</span>
                    </li>
                </ul>
            </div>

            <div class="contact project">
                <h3 class="title">Project</h3>
                <ul>
                    <li>
                        <h5>${projects}</h5>
                    </li>
                </ul>
            </div>

        </div>
        <div class="right_side">
            <div class="about">
                ${coverReponse}
            </div>
            <div class="about skills">
                <h2 class="title2">Professional Skills</h2>
                <div class="box">
                    <h4>${skills}</h4>
                </div>
                
            </div>

        </div>
    </div>`
    resumeDiv.innerHTML = resume;


    return coverReponse;
};

const coverLetterResponse_ =  getCoverLetter(name_, contact, skills, projects, experience, profession);
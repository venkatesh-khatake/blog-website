// Initialize blogs from localStorage
let blogs = JSON.parse(localStorage.getItem("blogs")) || [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop",
    type: "Education",
    title: "Getting Started with Frontend Development",
    description: "In this blog, we will explore how to begin your frontend development journey step by step.",
    author: "Venkatesh K.",
    date: "2025-09-15",
    paragraphs: [
      {
        title: "Introduction",
        content: "Frontend development is all about creating the visual part of websites and applications."
      },
      {
        title: "Technologies Required",
        content: "HTML, CSS, and JavaScript are the core building blocks."
      }
    ]
  },
  {
    id: 2,
    image: "https://plus.unsplash.com/premium_photo-1661326248013-3107a4b2bd91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dWklMjB1eHxlbnwwfHwwfHx8MA%3D%3D",
    type: "Product",
    title: "UX Review Presentation",
    description: "This blog covers the best practices for presenting UX reviews effectively.",
    author: "Olivia Rhye",
    date: "2025-09-12",
    paragraphs: [
      {
        title: "Why UX Review?",
        content: "UX reviews help teams understand usability issues early in the design process."
      },
      {
        title: "How to Present?",
        content: "Keep presentations simple, visual, and user-focused."
      }
    ]
  },
  {
    id: 3,
    image: "https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJvbnRlbmR8ZW58MHx8MHx8fDA%3D",
    type: "Development",
    title: "10 Tips for Better Frontend Code",
    description: "Improve your frontend skills with these essential coding tips and tricks.",
    author: "John Doe",
    date: "2025-08-30",
    paragraphs: [
      {
        title: "Clean Code",
        content: "Always write readable and maintainable code."
      },
      {
        title: "Use Git",
        content: "Version control is your best friend for collaborative projects."
      }
    ]
  }
];

// Add new paragraph
function addParagraph(){
    const paraDiv = document.createElement("div");
    paraDiv.classList.add("paragraph-group");
    paraDiv.innerHTML = `
        <label>Paragraph Title</label>
        <input type="text" name="paraTitle[]" placeholder="Enter paragraph title" />

        <label>Paragraph Content</label>
        <textarea name="paraContent[]" placeholder="Enter paragraph content" rows="5"></textarea>
    `;
    document.getElementById("paragraphs").appendChild(paraDiv);
}

// Render blogs on index.html
const container = document.querySelector('.blog-card-container');
function renderBlogs() {
  if(!container) return;
  container.innerHTML = ""; // clear old blogs
  blogs.forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");    
    blogCard.innerHTML = `
      <img src="${blog.image}" alt="${blog.title}" />
      <p class="type">${blog.type}</p>
      <h3>${blog.title}</h3>
      <p class="description">${blog.description}</p>
      <div class="author-date">
        <h4>${blog.author}</h4>
        <p>${new Date(blog.date).toLocaleDateString()}</p>
      </div>
    `;
    container.appendChild(blogCard);
  });
}

// Initial render
renderBlogs();

// Handle form submission (if form exists)
const blogForm = document.getElementById("blogForm");
if(blogForm){
  blogForm.addEventListener("submit", function(e){
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    const imageFile = document.getElementById("image").files[0];

    const paraTitles = Array.from(document.getElementsByName("paraTitle[]")).map(i => i.value);
    const paraContents = Array.from(document.getElementsByName("paraContent[]")).map(i => i.value);

    const paragraphs = paraTitles.map((t, i) => ({
      title: t,
      content: paraContents[i]
    }));

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = function(){
      const blog = {
        id: Date.now(),
        title,
        author,
        type,
        description,
        image: imageFile ? reader.result : "https://via.placeholder.com/150",
        paragraphs,
        date: new Date()
      };

      blogs.push(blog);

      // Save to localStorage
      localStorage.setItem("blogs", JSON.stringify(blogs));

      alert("Blog Published Successfully!");

      // Redirect to index.html
      window.location.href = "index.html";
    }

    if(imageFile){
      reader.readAsDataURL(imageFile);
    } else {
      reader.onload(); // use placeholder if no image
    }
  });
}

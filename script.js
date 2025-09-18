// Initialize blogs from localStorage
let blogs = JSON.parse(localStorage.getItem("blogs")) || [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1170&auto=format&fit=crop",
    type: "Education",
    title: "Getting Started with Frontend Development",
    description:
      "In this blog, we will explore how to begin your frontend development journey step by step. UX reviews help teams understand usability issues early in the design process.water, creating an exceptional cove. Vila Franca is uninhabited, at least by humans, but many different species of seabirds can be found on the islet. It is protected by BirdLife International, which has identified it as a priority area in terms of conservation. The sea is home to a wide variety of fish, including yellowtail, moray eels, parrotfish and stingrays. The flora is also rich, particularly in native plants such as sugar cane, tamarisk and myrtle. Since humans abandoned the island, its vineyards are no longer tended but a few hardy vines remain.",

    author: "Venkatesh K.",
    date: "2025-09-15",
    paragraphs: [
      {
        title: "Introduction",
        content:
          "Frontend development is all about creating the visual part of websites and applications.",
      },
      {
        title: "Technologies Required",
        content: "HTML, CSS, and JavaScript are the core building blocks.          UX reviews help teams understand usability issues early in the design process.water, creating an exceptional cove. Vila Franca is uninhabited, at least by humans, but many different species of seabirds can be found on the islet. It is protected by BirdLife International, which has identified it as a priority area in terms of conservation. The sea is home to a wide variety of fish, including yellowtail, moray eels, parrotfish and stingrays. The flora is also rich, particularly in native plants such as sugar cane, tamarisk and myrtle. Since humans abandoned the island, its vineyards are no longer tended but a few hardy vines remain.",
      },
    ],
  },
  {
    id: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1661326248013-3107a4b2bd91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dWklMjB1eHxlbnwwfHwwfHx8MA%3D%3D",
    type: "Product",
    title: "UX Review Presentation",
    description:
      "This blog covers the best practices for presenting UX reviews effectively.",
    author: "Olivia Rhye",
    date: "2025-09-12",
    paragraphs: [
      {
        title: "Why UX Review?",
        content:
          "UX reviews help teams understand usability issues early in the design process.water, creating an exceptional cove. Vila Franca is uninhabited, at least by humans, but many different species of seabirds can be found on the islet. It is protected by BirdLife International, which has identified it as a priority area in terms of conservation. The sea is home to a wide variety of fish, including yellowtail, moray eels, parrotfish and stingrays. The flora is also rich, particularly in native plants such as sugar cane, tamarisk and myrtle. Since humans abandoned the island, its vineyards are no longer tended but a few hardy vines remain.",
      },
      {
        title: "How to Present?",
        content:
          "Keep presentations simple, visual, and user-focused.In the middle of the Atlantic Ocean off the coast of São Miguel, the largest island in Portugal’s Azores, you’ll find its neighbour, the small islet of Vila Franca (Ilhéu de Vila Franca do Campo is its full name in Portuguese). Vila Franca is located in a protected nature reserve with a number of excellent spots for swimming and cliff diving. This uninhabited territory of about five hectares also contains a natural pool with a perfectly circular shape. This lagoon is located at the bottom of a volcanic crater and it has a number of underwater caves, also formed of volcanic rock.",
      },
    ],
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1678565879444-f87c8bd9f241?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJvbnRlbmR8ZW58MHx8MHx8fDA%3D",
    type: "Development",
    title: "10 Tips for Better Frontend Code",
    description:
      "Improve your frontend skills with these essential coding tips and tricks.",
    author: "John Doe",
    date: "2025-08-30",
    paragraphs: [
      {
        title: "Clean Code",
        content: "Always write readable and maintainable code. lorem",
      },
      {
        title: "Use Git",
        content:
          "Version control is your best friend for collaborative projects.",
      },
    ],
  },
];

// Add new paragraph
function addParagraph() {
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
const container = document.querySelector(".blog-card-container");
function renderBlogs() {
  if (!container) return;
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

    // 👇 Add click event to open details page
    blogCard.addEventListener("click", () => {
      localStorage.setItem("selectedBlogId", blog.id);
      window.location.href = "blog.html";
    });

    container.appendChild(blogCard);
  });
}

// Initial render
renderBlogs();

// Handle form submission (if form exists)
const blogForm = document.getElementById("blogForm");
if (blogForm) {
  blogForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    const imageFile = document.getElementById("image").files[0];

    const paraTitles = Array.from(
      document.getElementsByName("paraTitle[]")
    ).map((i) => i.value);
    const paraContents = Array.from(
      document.getElementsByName("paraContent[]")
    ).map((i) => i.value);

    const paragraphs = paraTitles.map((t, i) => ({
      title: t,
      content: paraContents[i],
    }));

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = function () {
      const blog = {
        id: Date.now(),
        title,
        author,
        type,
        description,
        image: imageFile ? reader.result : "https://via.placeholder.com/150",
        paragraphs,
        date: new Date(),
      };

      blogs.push(blog);

      // Save to localStorage
      localStorage.setItem("blogs", JSON.stringify(blogs));

      alert("Blog Published Successfully!");

      // Redirect to index.html
      window.location.href = "index.html";
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      reader.onload(); // use placeholder if no image
    }
  });
}

// Get selected blog id
const blogId = localStorage.getItem("selectedBlogId");

// Find that blog
const blog = blogs.find((b) => b.id == blogId);

if (blog) {
  document.getElementById("blog-title").innerText = blog.title;
  document.getElementById("blog-author").innerText = "By - " + blog.author;
  document.getElementById(
    "blog-image"
  ).style.backgroundImage = `url(${blog.image})`;
  document.getElementById("blog-description").innerText = blog.description;

  // Paragraphs
  const paraContainer = document.getElementById("blog-paragraphs");
  paraContainer.innerHTML = blog.paragraphs
    .map(
      (p) => `
        <h3>${p.title}</h3>
        <p>${p.content}</p>
      `
    )
    .join("");
} else {
  document.querySelector(".blog").innerHTML = "<h2>Blog not found!</h2>";
}

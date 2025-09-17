// Initialize blogs from localStorage
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

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

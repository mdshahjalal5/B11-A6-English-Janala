const displayLessons = async () => {
  const { data: datas } = await fetchData(
    "https://openapi.programming-hero.com/api/levels/all",
  );
  // console.log(`lessons`, datas);
  let lessonsContainer = document.getElementById("lessons_btn");
  datas.forEach((data) => {
    const div = document.createElement("i");
    div.innerHTML = `
<button onclick="displayWords(${data.level_no})" id='${data.level_no}' class="btn btn-outline btn-primary">Lesson-${data.level_no}</button>

`;
    // console.log(data, "index.js", 9);

    lessonsContainer.appendChild(div);
  });
  toggleActive();
};

displayLessons();

const toggleActive = () => {
  const lessonBtns = document.querySelectorAll("#lessons_btn button");

  lessonBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".active").forEach((activeBtn) => {
        activeBtn.classList.remove("active");
      });

      e.target.classList.add("active");
      // console.log(`Active button:`, e.target.id);
    });
  });
};
const displayWords = async (id) => {
  console.log(id, "index.js", 37);
  let url = `https://openapi.programming-hero.com/api/level/${id}`;

  const videoContainer = document.getElementById("video_container");
  videoContainer.innerHTML = `
    <div class="flex justify-center ">
      LOADING...
      <span class="loading loading-spinner text-primary"></span>
      <span class="loading loading-spinner text-secondary"></span>
      <span class="loading loading-spinner text-accent"></span>
      <span class="loading loading-spinner text-neutral"></span>
      <span class="loading loading-spinner text-info"></span>
    </div>
  `;

  const { data: words } = await fetchData(url);
  videoContainer.innerHTML = "";

  videoContainer.classList.add("grid");
  if (!words.length) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
<div
      class="mt-10 max-w-[300x] p-3 py-9 rounded text-center shadow-xl space-y-3 border"
    >
      <div class="flex justify-center">
        <img src="assets/alert-error.png" alt="" />
      </div>
      <p class="text-gray-500">
        এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
      </p>
      <h1 class="text-xl font-medium">নেক্সট Lesson এ যান</h1>
    </div>
`;
  }
  words.forEach((word) => {
    const div = document.createElement("div");
    div.innerHTML = `
<div
      class="mt-10 max-w-[300px] p-3 py-9 rounded text-center shadow-xl space-y-3"
    >
      <h2 class="text-xl font-semibold text-orange-400">Eager</h2>
      <p class="text-gray-500">Meaning/Pronunciation</p>
      <p class="text-x font-medium">agrohi/igar</p>
      <div class="flex justify-around">
        <button class="btn">i</button>
        <button class="btn">Sp</button>
      </div>
    </div>
`;
    videoContainer.appendChild(div);
  });

  // console.log(words, "index.js", 57);
};
// displayWords();

const routineList = JSON.parse(localStorage.getItem('routineList')) || [];
renderRoutine();


function enter() {
  const routine = document.querySelector('.js-input-routine');
  const routineInput = routine.value;
  const sets = document.querySelector('.js-amount-of-sets').value;
  const reps = document.querySelector('.js-amount-of-reps').value;
  const date = document.querySelector('.js-date').value;
  const uniqueId = () => {
    return Math.floor(Math.random() * Date.now());
  }

  routineList.push({name: routineInput, reps: reps, sets: sets, date: date, id: uniqueId()});
  routine.value = '';
  renderRoutine();
  saveToStor();
  console.log(routineList);
}

function renderRoutine() {
  let RoutineHTML = '';
  routineList.forEach(function(routineObject) {
    const {name, reps, sets, date, id} = routineObject;
    let row = `
    <p>
      <div class="name-div">${name};</div>
      <div class="rep-div">repetitions: ${reps};</div>
      <div class="set-div">sets: ${sets};</div>
      <div class="date-div">date: ${date}</div>
      <button class="delete-button js-delete-button" onclick="deleteExercise(${id}); renderRoutine(); saveToStor();">Delete</button>
      <button class="update-button" data-update-id=${id}>Update</button>
      <input class="set-input" type="number" placeholder="Sets">
      <input class="rep-input" type="number" placeholder="Reps">
      <button class="save-button" data-save-id=${id}>Save</button>
    </p>`
    RoutineHTML += row;
  })
  document.querySelector('.js-routine-list').innerHTML = RoutineHTML;
}

function saveToStor() {
  localStorage.setItem('routineList', JSON.stringify(routineList));
}

const filter = document.querySelector('.js-filter');

filter.addEventListener('keyup', (e) => {
  const searchString = e.target.value;
  const filtered = routineList.filter((exercise) => {return (exercise.name.includes(searchString));});
  displayExercise(filtered);
})
filter.addEventListener('focus', (e) => {
  const searchString = e.target.value;
  const filtered = routineList.filter((exercise) => {return (exercise.name.includes(searchString));});
  displayExercise(filtered);
})

function displayExercise(exercises) {
  const row = exercises.map((exercise) => {
    return `<p>
    <div class="name-div">${exercise.name};</div>
    <div class="rep-div">repetitions: ${exercise.reps};</div>
    <div class="set-div">sets: ${exercise.sets};</div>
    <div class="date-div">date: ${exercise.date}</div>
    <button class="delete-button" onclick="deleteExercise(${exercise.id}); renderRoutine(); saveToStor();">Delete</button>
    <button class="update-button">Update</button>
    </p>`})
    .join('');
  document.querySelector('.js-routine-list').innerHTML = row;
}

document.querySelector('.js-submit-btn').addEventListener('click', enter);

function deleteExercise(id) {
  if (confirm("Are You sure?")) {
    routineList.forEach((item)=>{
      if (item.id === id) {
        routineList.splice(routineList.indexOf(item), 1);
      }
    })
  }
}

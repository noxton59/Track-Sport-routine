const routineList = JSON.parse(localStorage.getItem('routineList')) || [];
renderRoutine();


function enter() {
  const routine = document.querySelector('.js-input-routine');
  let routineInput = routine.value;
  const sets = document.querySelector('.js-amount-of-sets');
  let setsInput = sets.value;
  const reps = document.querySelector('.js-amount-of-reps');
  let repsInput = reps.value;
  const date = document.querySelector('.js-date').value;
  const uniqueId = () => {
    return Number(Math.floor(Math.random() * Date.now()));
  }
  if (routine.value == 0 || sets.value == 0 || reps.value ==0 || date == 0) {
    document.querySelector('.alert-message').classList.add("is-alert");
  }
  else {
    routineList.push({name: routineInput, reps: repsInput, sets: setsInput, date: date, id: uniqueId()});
    routine.value = '';
    sets.value = "";
    reps.value = "";
    renderRoutine();
    saveToStor();
    document.querySelector('.alert-message').classList.remove("is-alert");
  }
  
}

function renderRoutine() {
  let RoutineHTML = '';
  routineList.forEach(function(routineObject) {
    const {name, reps, sets, date, id} = routineObject;
    let row = `
    <div class="js-container-${id} container">
      <div class="name-div">${name}</div>
      <div class="rep-div">repetitions: ${reps}</div>
      <div class="set-div">sets: ${sets}</div>
      <div class="date-div">date: ${date}</div>
      <button class="delete-button js-delete-button" data-delete-id=${id}>Delete</button>
      <button class="update-button js-update-button" data-update-id=${id}>Update</button>
      <input class="rep-input js-rep-input js-input-rep-${id}" type="number" placeholder="Reps" data-input-rep-id=${id}>
      <input class="set-input js-set-input js-input-set-${id}" type="number" placeholder="Sets" data-input-set-id=${id}>
      <button class="save-button js-save-button" data-save-id=${id}>Save</button>
    </div>`
    RoutineHTML += row;
  })
  document.querySelector('.js-routine-list').innerHTML = RoutineHTML;

  document.querySelectorAll(".js-delete-button").forEach((button)=>{
    button.addEventListener('click', ()=>{
      const exerId = Number(button.dataset.deleteId);
      const container = document.querySelector(`.js-container-${exerId}`);
      if (confirm("Are You sure?")) {
        routineList.forEach((item)=>{
          if (item.id === exerId)
          routineList.splice(routineList.indexOf(item), 1);
          container.remove();
          renderRoutine();
          saveToStor();
        }) 
      }
    })
  })

  document.querySelectorAll(".js-update-button").forEach((button)=>{
    button.addEventListener('click', ()=>{
      document.querySelector(`.js-container-${button.dataset.updateId}`).classList.add("is-updating");
    })
  })

  document.querySelectorAll(".js-save-button").forEach((button)=>{
    button.addEventListener('click', ()=>{
      document.querySelector(`.js-container-${button.dataset.saveId}`).classList.remove("is-updating");
      let newSets = Number(document.querySelector(`.js-input-set-${button.dataset.saveId}`).value);
      let newReps = Number(document.querySelector(`.js-input-rep-${button.dataset.saveId}`).value);
      const saveButtonId = button.dataset.saveId;
      routineList.forEach((routine)=>{
        if (routine.id == saveButtonId) {
          routine.sets = newSets;
          routine.reps = newReps;
          renderRoutine();
          saveToStor();
        }
        
      })
    })
  })
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
    return `
    <div class="js-container-${exercise.id} container">
      <div class="name-div">${exercise.name}</div>
      <div class="rep-div">repetitions: ${exercise.reps}</div>
      <div class="set-div">sets: ${exercise.sets}</div>
      <div class="date-div">date: ${exercise.date}</div>
      <button class="delete-button js-delete-button" data-delete-id=${exercise.id}>Delete</button>
      <button class="update-button js-update-button" data-update-id=${exercise.id}>Update</button>
      <input class="rep-input js-rep-input js-input-rep-${exercise.id}" type="number" placeholder="Reps" data-input-rep-id=${exercise.id}>
      <input class="set-input js-set-input js-input-set-${exercise.id}" type="number" placeholder="Sets" data-input-set-id=${exercise.id}>
      <button class="save-button js-save-button" data-save-id=${exercise.id}>Save</button>
    </div>`})
    .join('');
  document.querySelector('.js-routine-list').innerHTML = row;

  document.querySelectorAll(".js-delete-button").forEach((button)=>{
    button.addEventListener('click', ()=>{
      const exerId = Number(button.dataset.deleteId);
      const container = document.querySelector(`.js-container-${exerId}`);
      if (confirm("Are You sure?")) {
        routineList.forEach((item)=>{
          if (item.id === exerId)
          routineList.splice(routineList.indexOf(item), 1);
          container.remove();
          const searchString = filter.value;
          const filtered = routineList.filter((exercise) => {return (exercise.name.includes(searchString));});
          displayExercise(filtered);
          saveToStor();
        }) 
      }
    })
  })
  document.querySelectorAll(".js-update-button").forEach((button)=>{
    button.addEventListener('click', ()=>{
      document.querySelector(`.js-container-${button.dataset.updateId}`).classList.add("is-updating");
    })
  })

  document.querySelectorAll(".js-save-button").forEach((button)=>{
    button.addEventListener('click', ()=>{
      document.querySelector(`.js-container-${button.dataset.saveId}`).classList.remove("is-updating");
      let newSets = Number(document.querySelector(`.js-input-set-${button.dataset.saveId}`).value);
      let newReps = Number(document.querySelector(`.js-input-rep-${button.dataset.saveId}`).value);
      const saveButtonId = button.dataset.saveId;
      routineList.forEach((routine)=>{
        if (routine.id == saveButtonId) {
          routine.sets = newSets;
          routine.reps = newReps;
          const searchString = filter.value;
          const filtered = routineList.filter((exercise) => {return (exercise.name.includes(searchString));});
          displayExercise(filtered);
          saveToStor();
        }
        
      })
    })
  })
}

document.querySelector('.js-submit-btn').addEventListener('click', enter);

document.querySelector(".js-input-routine").addEventListener('focus', ()=>{
  document.querySelector('.alert-message').classList.remove("is-alert");
})
document.querySelector('.js-amount-of-reps').addEventListener('focus', ()=>{
  document.querySelector('.alert-message').classList.remove('is-alert');
})
document.querySelector('.js-amount-of-sets').addEventListener('focus', ()=>{
  document.querySelector('.alert-message').classList.remove('is-alert');
})
document.querySelector('.js-date').addEventListener('focus', ()=>{
  document.querySelector('.alert-message').classList.remove('is-alert');
})



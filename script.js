window.addEventListener('load', () => {
    let input = document.querySelector('#search');
    let tagInputField = document.querySelector('#addTag'); 
    let ul = document.querySelector('#ul');
    let listArray = ['javascript', 'apple', 'react-js', 'games', 'out', 'coding', 'dribble', 'watermelon', 'codepen', 'orange', 'stackoverflow', 'daily-ui', 'rest--full', 'push', 'something', 'teeth', 'ultra', 'ultrasound', 'you', 'zebra'];
    let set = 0;
    // toggle between add and search
    let toggleSearch = document.querySelector('.toggleSearch');
    let toggleAddTag = document.querySelector('.toggleAddTag');

    // elements to be displayed upon toggle
    let addContainer = document.querySelector('.addContainer');
    let searchContainer = document.querySelector('.searchContainer');
    // toggle between button and displaying search options
    let toggleClass = (event) => {
        // toggle between Button
        toggleSearch.classList.toggle('active');
        toggleAddTag.classList.toggle('active');

        // toggle between input fields
        addContainer.classList.toggle('show');
        searchContainer.classList.toggle('show');
       }
    // attaching event listener
    toggleSearch.addEventListener('click', toggleClass);
    toggleAddTag.addEventListener('click', toggleClass);
    toggleSearch.set = 1;
    toggleAddTag.set = 0;
    // temp addContainer's tag
    let tempTagArray = [];
    let colorList = [
        '#E9573F',
        '#37BC9B',
        '#967ADC',
        '#F6BB42',
        '#D770AD'
    ]

    // helper function for color picking
    let numPicker = () => {
        return Math.floor((Math.random() * colorList.length) + 1)
    }
    // function to create element
    const addTag = () =>  {
        listArray.sort();
        for(let i = 0; i < listArray.length; i++) {
            let color = colorList[numPicker()];
            let li = document.createElement('li');
            let button = document.createElement('button');
            let span = document.createElement('i');
            span.classList.add('fas', 'fa-times');
            button.setAttribute('class', 'closeTag');
            button.appendChild(span);
            li.innerText = listArray[i];
            li.appendChild(button);
            ul.appendChild(li);
            li.style.backgroundColor = color;
            li.style.boxShadow = '0px 0px 3px #AAB2BD';
            button.addEventListener('click', removeTag);
        }
    }
    addTag();
    
    function removeTempTag(event) {
        event.currentTarget.parentNode.parentNode.removeChild(event.currentTarget.parentNode);
        set--;
    }
    function removeTag(event) {
        event.currentTarget.parentNode.remove();
        let val = event.currentTarget.parentNode.innerText;
        let test = listArray.filter((value, i) => {
            return value != val;
        })
        listArray = test;
    }
  
    tagInputField.addEventListener('keyup', (event) => {
        if(event.key == "," || event.keyCode == 188 ){
            let tempTag = event.target.value.replace(/,/g, ' ');
            let trim = tempTag.trim();
            if(trim.length > 0) {
                tagInputField.value = "";
                let parentCon = document.querySelector('.addContainer');
                let buttonClass = document.createElement('div');
                let span = document.createElement('span');
                let i = document.createElement('i');
                i.setAttribute('class', 'fas fa-times');
                buttonClass.innerText = trim;
                buttonClass.setAttribute('class', 'buttonClass')
                span.appendChild(i);
                buttonClass.appendChild(span); 
                parentCon.insertBefore(buttonClass, parentCon.lastElementChild);
                span.addEventListener('click', removeTempTag);
                set++;
                console.log(set)
            } 
        }
        // set > 0 to ensure addTag doesnot fire on an emty "ENTER" keyPress
        else if ((event.key == 'Enter' || event.keyCode == 13) && set > 0){
                let tags = [...document.querySelectorAll('.addContainer .buttonClass')];
                let li = [...document.querySelectorAll('.ul li')];
                for(let i = 0; i < tags.length; i++){
                    listArray.push(tags[i].innerText.toLowerCase());
                    tags[i].parentNode.removeChild(tags[i]);
                }
                for(let i = 0; i < li.length; i++){
                    li[i].parentNode.removeChild(li[i]);
                }
                addTag();
        } 
    })
    input.addEventListener('keyup', () => {
        let inputTxt = input.value.toLowerCase();
        let li = [...document.querySelectorAll('.ul li')];
        for( i = 0; i < listArray.length; i++) {
          if(listArray[i].indexOf(inputTxt) > -1) {
              li[i].style.display = '';
          }
          else {
              li[i].style.display = 'none';
          }
        }
    })

})

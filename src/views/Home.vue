<template>
  <div
    class="container blog d-flex-column justify-content-center px-0"
    style="overflow-x: auto;font-family:Microsoft JhengHei;"
  >                
    <div class="d-flex flex-row g-4" style="margin: 0 12px;">  
      <div v-if="sliderVModel > 0" class="">
        <a @click="back()"><font-awesome-icon icon="angle-left" style="font-size: 1.5rem;margin-top: 10px;color: #4e4c4c;"/></a>
      </div> 
      <div class="" style="width: 100%;">
        <h3 class="" style="margin-top: 10px;font-weight: 900;color:rgb(4 150 231);">iEdge<span style="color:#bdbdbd;font-weight: 900; ">SEMI</span></h3>      
      </div> 
      <div class="">
        <a @click="download()"><font-awesome-icon icon="download" style="font-size: 1.5rem;margin-top: 10px;color: #4e4c4c;"/></a>
      </div>       
    </div>         
  </div>  
  
  <carousel v-model="sliderVModel" :settings="settings">
    <Slide
      v-for="(item, index) in imagesGallery"
      :key="index"
      :index="index"
    >
      <div
        class="container blog d-flex-column justify-content-center px-0"
        style="overflow-x: auto;margin-top: 10px;"
      >     
        <div class="d-flex flex-row row-cols-1 g-4" style="">   
          <h5 style="text-align: left;font-weight: 600;color: #5a5757"> {{item['title']}}</h5>
        </div>         
        <div class="d-flex flex-row row-cols-1 g-4" style="margin-top: 5px;">   
          <span style="text-align: justify;color: #4e4d4d;font-weight: 500;font-family:Microsoft JhengHei;"> {{item['introduction']}}</span>
        </div>          
        <div v-if="item.contentType === 'image'" class="d-flex flex-row row-cols-1 g-4" style="margin-top: 20px;">   
          <img :id="item.id" :src="item.contentImage" style="height: 400px;"/>
        </div>  
        <div v-if="item.contentType === 'youtube'" class="d-flex flex-row row-cols-1 g-4" style="margin-top: 20px;"> 
          <iframe width="1280" :height="item.height" :src="item.contentImage" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>        
        </div>
        
        <div class="d-flex flex-row row-cols-1 g-4" style="margin: 15px 15px 15px 15px;">   
          <div>
            <input
              v-if="item.doubleCheck"
              class="form-check-input"
              type="checkbox"
              v-model="doubleCheck"              
            />
            <span class="text-secondary px-1">
              {{item['doubleCheckText']}}
            </span>
          </div>
        </div>    
        <button
          id="Button"
          type="button"
          :href="'tel:0910111111'"
          style="width: 100%;background-color: #55b99d;border-color: #55b99d;color: #fff"
          class="btn  w-20"
          @click="next()"
          :disabled="!doubleCheck"
        >
          {{item.button}}
        </button>                            
     
      </div>  
      
      <!--<div class="row d-flex justify-content-between align-items-center"> <img style="width: 100%" :src="img.imageUrl" /></div>-->
      
    </Slide>

  </carousel>
  <!--<input
    class="form-control form-control-lg mb-3"
    type="text"
    autofocus
    autocomplete="off"
    placeholder="What needs to be done?"
    @keyup.enter="addTodo"
  />
  <ul class="list-group mb-3" v-show="todos.length">
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <div>
        <input
          class="form-check-input me-3"
          type="checkbox"
          :checked="allChecked"
          @change="toggleAll(!allChecked)"
        />
        <span class="text-secondary px-1">
          {{ remaining }} {{ pluralize(remaining, "item") }} left
        </span>
      </div>
      <nav class="nav">
        <ul class="nav">
          <li class="nav-item" v-for="(val, key) in filters" :key="key">
            <a
              class="nav-link px-2 py-1"
              :href="'#/' + key"
              :class="{ 'link-secondary': visibility !== key }"
              @click="visibility = key"
              >{{ capitalize(key) }}
            </a>
          </li>
        </ul>
      </nav>
    </li>
    <TodoItem v-for="todo in filteredTodos" :key="todo.id" :todo="todo" />
  </ul>-->
</template>

<script>
import { mapActions } from "vuex";
//import TodoItem from "@/components/TodoItem.vue";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide} from 'vue3-carousel';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faDownload} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { reactive} from "vue";
const states = reactive({
  deferredPrompt: null,
});

library.add(faAngleLeft, faDownload)

const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.done),
  completed: (todos) => todos.filter((todo) => todo.done),
};

export default {
  name: "Home",
  props: {
    filter: String,
  },
  components: {
    //TodoItem,
    Carousel,
    Slide,
    FontAwesomeIcon 
  },
  data() {
    return {
      visibility: this.filter,
      filters: filters,
      buttonEnable: "disabled",
      sliderVModel: 0,
      appinstalled: false,
      settings: {
        mouseDrag: false,
        touchDrag: false
      },      
      imagesGallery: [
        {
          contentType: "image",
          id: "index1",
          title: "Q",
          introduction: "",
          doubleCheck: false,
          doubleCheckText: "",
          checkAction: {
            type: "none"
          },
          contentImage: "img/4.jpg",
          button: "建議",
        }, 
        {
          contentType: "image",
          id: "index2",
          title: "A",
          introduction: "",
          doubleCheck: false,
          doubleCheckText: "",
          checkAction: {
            type: "none"
          },
          contentImage: "img/5.jpg",
          button: "推薦方案",
        },     
        {
          contentType: "image",
          id: "index3",
          title: "EI-52 SECS Gateway",
          introduction: "輕鬆接入",
          doubleCheck: true,
          doubleCheckText: "想實際體驗",          
          checkAction: {
            type: "none"
          },
          contentImage: "img/6.jpg",
          button: "體驗產品",
        },     
        {
          contentType: "youtube",
          id: "index5",
          title: "Demo網站",
          introduction: "",
          doubleCheck: false,
          doubleCheckText: "",          
          checkAction: {
            type: "none"
          },
          height: 600,
          contentImage: "https://iedge-demo.eastasia.cloudapp.azure.com:8443/?username=root&password=Tv1BY1VYlizUC5Ae3smP9g==&SSO=false&route=dashboards",
          button: "聯絡我們",
        },                           
        {
          contentType: "youtube",
          id: "index4",
          title: "iEdge I.App 邊緣智能管理服務",
          introduction: "",
          doubleCheck: false,
          doubleCheckText: "",          
          checkAction: {
            type: "none"
          },
          contentImage: "https://www.youtube.com/embed/MH4ozP8JpQk?start=10",
          height: 260,
          button: "聯絡我們",
        },         
    
      ],   
      doubleCheck: false,   
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    allChecked() {
      return this.todos.every((todo) => todo.done);
    },
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return this.todos.filter((todo) => !todo.done).length;
    },
  },
  watch: {
    doubleCheck(data){
      let obj = document.getElementById(this.imagesGallery[this.sliderVModel].id);
      if(this.imagesGallery[this.sliderVModel].checkAction){
        if(this.imagesGallery[this.sliderVModel].checkAction.type === "image"){
          if(data){
            obj.setAttribute("src", this.imagesGallery[this.sliderVModel].checkAction.imgUrl);
          }else{
            obj.setAttribute("src", this.imagesGallery[this.sliderVModel].contentImage);
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(["toggleAll", "clearCompleted"]),
    addTodo(e) {
      const text = e.target.value.trim();
      if (text) {
        this.$store.dispatch("addTodo", text);
        e.target.value = "";
      }
    },
    pluralize(n, w) {
      return n === 1 ? w : w + "s";
    },
    capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    next() {
      if(this.sliderVModel < this.imagesGallery.length - 1){
        this.sliderVModel = this.sliderVModel + 1
        this.doubleCheck = !this.imagesGallery[this.sliderVModel]['doubleCheck']
      }else{
        window.open('tel:0227927818');
      }
    },
    back() {
      if(this.sliderVModel > 0){
        this.sliderVModel = this.sliderVModel - 1
        this.doubleCheck = !this.imagesGallery[this.sliderVModel]['doubleCheck']
      }
    }, 
    download() {
      if (!this.appinstalled) {
        if(states.deferredPrompt){
          console.log('deferredPrompt');
          states.deferredPrompt.prompt();
          states.deferredPrompt = null;
        }else{
          alert('Not support')
        }
      }else{
        alert('Already install')
      }      
    },  
  },
  beforeMount: function() {
    console.log('Start mounted 1');
    window.addEventListener('beforeinstallprompt', function (event) {
      console.log('beforeinstallprompt');
      event.preventDefault();
      states.deferredPrompt = event;
    });
    window.addEventListener("appinstalled", () => {
      console.log('appinstalled');
      this.appinstalled = true
      states.deferredPrompt = null;
    });
  },   
  mounted: function() {
    this.doubleCheck = !this.imagesGallery[this.sliderVModel]['doubleCheck']
  },  
};
</script>

<style lang="scss">
.form-check-input {
  cursor: pointer;
}
.form-check-input[type=checkbox] {
    border-radius: 1.25em;
}
.form-check-input:checked {
    background-color: #55b680;
    border-color: #55b680;
}
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color:  var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
  align-items: unset;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
.scroll{
    overflow-y: unset;
    overflow-x: unset;
}   
button {
    touch-action: manipulation;
}
</style>

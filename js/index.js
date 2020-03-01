var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

Vue.component('post', {
  props: ['data'],
  template: `<article class="card">
      <div class="card-image">
        <figure class="image is-3by2">
          <a v-bind:href="href(data.id)"><img v-bind:src="src(data.image)" alt="Image" /></a>
        </figure>
      </div>
      <div class="card-body">
        <div class="card-content">
          <div class="content">
            <a v-bind:href="href(data.id)"><p class="subtitle">{{ data.title }}</p></a>
            {{ data.intro }}
          </div>
          <footer>
            <time datetime="datetime(data.date)">{{ formatDatetime(data.date) }}</time>
          </footer>
        </div>
      </div>
    </article>`,
  methods: {
    src: function(image) {
      return 'images/' + image;
    },
    href: function(id) {
      return '/post/' + id;
    },
    datetime: function(datetime) {
      return datetime.replace('T', ' ');
    },
    formatDatetime: function(datetime) {
      const date = new Date(datetime);
      return (
        date.getDay() +
        ' ' +
        monthNames[date.getMonth()] +
        ' ' +
        date.getFullYear() +
        ', ' +
        date.getHours() +
        ':' +
        date.getMinutes()
      );
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    allPosts: null,
    posts: null,
    count: 4,
    hasNext: false,
    loading: false,
    filter: 'all'
  },
  methods: {
    emptyArray: function(array) {
      return !array || array.length == 0;
    },
    // nastavFilter: function(f) {
    //   this.filter = f;
    //   this.search = '';
    // },
    loadNextPosts: function(delay) {
      if (delay == undefined) {
        delay = 1000;
      }
      this.loading = true;
      var self = this;
      setTimeout(function() {
        const nrOfPostsToDisplay = Math.min(self.count, self.allPosts.length - self.posts.length);
        console.log('nrOfPostsToDisplay', nrOfPostsToDisplay);
        self.posts = self.posts.concat(self.allPosts.splice(self.posts.length, nrOfPostsToDisplay));
        self.hasNext = self.posts.length < self.allPosts.length;
        self.loading = false;
      }, delay);
    }
  },
  mounted: function() {
    $.getJSON('/data/posts.json', function(json) {
      app.allPosts = json;

      if (app.allPosts && app.allPosts.length > 1) {
        console.log('loading');
        app.posts = [];
        app.loadNextPosts();
      }

      $(document).ready(function() {
        if ('ontouchstart' in document.documentElement || 'ontouchstart' in window) {
          $('#app').addClass('touch');
        }
        // initialize();
      });
    });
  }
});

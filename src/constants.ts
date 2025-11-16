// dev level environment variable. Defined in vite.config file

// export const baseURL = `http://${__HOST_IP__}:8000/api/`;
export const baseURL =
  import.meta.env.MODE === 'production'
    ? 'https://kholmukhamedov-vitalii.com/api/'
    : import.meta.env.__USE_HTTPS__
      ? `https://${import.meta.env.__HOST_IP__}:8000/api/`
      : `http://${import.meta.env.__HOST_IP__}:8000/api/`;
// : `https://${__HOST_IP__}:8000/api/`;

// export const baseURL = 'https://kholmukhamedov-vitalii.com/api/';
// To not bother with path resolution I put image to public dir instead of src/assets
export const projects = [
  {
    title: 'Blog',
    routeByName: 'portfolio-blog-project'
    // image: '/BlogScreenshot.png'
  },
  {
    title: 'More soon!',
    routeByName: 'portfolio-more-soon'
  }
];

export const SkillsDescription = {
  frontend: {
    typescript: 'Develop type-safe, maintainable user interfaces using TypeScript.',
    vue: 'Build responsive, component-based UIs with Vue for intuitive user experiences.',
    tailwind: 'Apply Tailwind CSS to create modern, mobile-first layouts.'
  },
  backend: {
    django: 'Create robust web applications with Django, leveraging ORM and authentication.',
    sql: 'Design and query relational databases using SQL for efficient data management.',
    restfulAPI: 'Implement RESTful APIs to enable seamless data integration.'
  }
};

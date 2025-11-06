<script setup>
import Contact from '@/components/resume blocks/TheContact.vue';
import TechStack from '@/components/resume blocks/techStack/TheTechStack.vue';
import PersonalDetails from '@/components/resume blocks/PersonalDetails.vue';
import Photo from '@/components/resume blocks/ThePhoto.vue';
</script>

<template>
  <!-- I overrode overflow property cause I need only right side to be scrollable -->
  <main class="flex h-full flex-col bg-base-200 lg:flex-row lg:overflow-hidden">
    <!-- Left Panel -->
    <aside class="flex min-w-[350px] flex-col gap-4 p-6 sm:flex-row sm:gap-0 lg:flex-col xl:w-1/4">
      <Photo class="shrink-2 order-1 self-center sm:order-2 lg:order-1" />
      <Contact class="order-2 sm:order-1 lg:order-2" />
      <PersonalDetails class="shrink-2 order-3" />
    </aside>

    <!-- Right Panel: this is the SCROLL CONTAINER with the BG and the GRID -->
    <section class="flex-1 lg:overflow-auto">
      <div
        class="min-h-full bg-base-300 bg-cover bg-center bg-no-repeat pb-6 bg-blend-overlay dark:bg-blend-soft-light lg:bg-[url('@/assets/cb.webp')]"
      >
        <div
          class="grid grid-cols-[1fr_repeat(5,1fr)_0.5fr_1fr_0.5fr_1fr_1fr_0.5fr_1fr_0.5fr_repeat(5,1fr)_1fr] grid-rows-[repeat(7,auto)] items-center pb-1 pt-5 md:pt-8"
        >
          <div class="col-span-1 row-span-7 h-full shrink-[2] basis-0"></div>
          <div
            class="col-span-18 col-start-2 row-span-7 row-start-1 gap-y-3 text-center subgrid md:gap-y-5"
          >
            <h1
              class="col-span-18 row-span-1 mx-auto font-serif text-4xl font-bold text-base-content md:text-6xl 2xl:text-8xl"
            >
              Hi, I am a developer!
            </h1>
            <h2
              class="col-span-18 row-span-1 mx-auto mb-2 font-mono text-xl font-bold text-base-content/60 md:text-2xl 2xl:text-3xl"
            >
              I design scalable web applications and APIs with modern tools, blending clean design
              with reliable performance.
            </h2>
            <TechStack class="col-span-18 row-span-5 gap-y-3 subgrid" />
          </div>
          <div class="col-span-1 col-start-20 row-span-7 h-full shrink-[2] basis-0"></div>
        </div>
      </div>
    </section>
  </main>
</template>

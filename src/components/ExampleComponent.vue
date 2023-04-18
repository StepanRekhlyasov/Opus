<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo, index in list" :key="index">
        {{ todo.Name }} - {{ todo.Task }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Authorized: {{ active ? 'yes' : 'no' }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  toRef,
  Ref,
} from 'vue';
import { TaskList, Meta } from './models';

function useDisplayTodo(list: Ref<TaskList[]>) {
  const todoCount = computed(() => list.value.length);
  return { todoCount };
}

export default defineComponent({
  name: 'ExampleComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array as PropType<TaskList[]>,
      default: () => []
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(props) {
    return { ...useDisplayTodo(toRef(props, 'list')) };
  },
});
</script>

<template>
  <div style="display: flex; flex-direction: column; row-gap: 1.5rem;">
    <h1 style="">tRPC Demo</h1>
    <div v-if="helloLoading">
      <span>Hello Loading...</span>
    </div>
    <div v-else>
      <span>My first RPC says:</span>
      <span>{{ hello }}</span>
    </div>


    <div>
      <h2>Resources</h2>
      <button @click="refetchResources()">{{ refetchBtnLabel }}</button>
      <div v-if="resourcesLoading || resourcesFetching">
        <span>Ressources Loading...</span>
      </div>
      <div v-else>
        <ul>
          <li v-for="resource in resources" :key="resource.id">
            {{ resource.value }}
          </li>
        </ul>
      </div>
    </div>

    <div>
      <h2>Create a new resource</h2>
      <input type="text" v-model="resourceInput" />
      <button @click="mutate(resourceInput)">Create resource</button>
    </div>
    {{ error?.message }}
  </div>
</template>

<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { trpc } from './trpc'
import { computed, ref } from 'vue';

const simulateDelay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

const queryClient = useQueryClient()


const { data: hello, isLoading: helloLoading } = useQuery({
  queryFn: async () => {
    await simulateDelay()
    return trpc.public.hello.query()
  },
  queryKey: ['hello'],
})

const { data: resources, isLoading: resourcesLoading, refetch: refetchResources, isRefetching: resourcesFetching } = useQuery({
  queryFn: async () => {
    await simulateDelay()
    return trpc.public.getAllResources.query()

  },
  queryKey: ['resources'],
})

const refetchBtnLabel = computed(() => {
  if (resourcesFetching.value || resourcesLoading.value) return 'Loading...'
  return 'Refetch'
})



const resourceInput = ref('')

const { error, mutate } = useMutation({
  mutationFn: async (v: string) => {
    const res = await trpc.public.createResource.mutate(v)
    resourceInput.value = ''
    return res
  },
  onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['resources'] })    
  },
})
</script>
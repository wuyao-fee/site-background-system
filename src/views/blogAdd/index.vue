<template>
  <EditBlog mode="add"/>
</template>

<script>
import EditBlog from '@/components/EditBlog';
export default {
  props: ["mode"],
  components: {
    EditBlog
  }
}
</script>

<style>

</style>
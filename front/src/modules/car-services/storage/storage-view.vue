<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getDownloadURL, listAll, ref as storageRef, uploadBytesResumable, deleteObject } from "firebase/storage";
import { auth, storage } from '../../../services/firebase.config';
import { useTheme } from '../../../composables/useTheme';

const selectedFile = ref<File | null>(null);
const images = ref<{ name: string; url: string }[]>([]);
const { color } = useTheme();
const showFullImage = ref(true);
const selectedImageUrl = ref("");

async function fetchImages() {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const userFolderRef = storageRef(storage, `pictures/${userId}`);
  
  try {
    const res = await listAll(userFolderRef);
    images.value = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return { name: itemRef.name, url };
      })
    );
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
}

async function uploadFile() {
  if (!selectedFile.value || !auth.currentUser) return;

  const userId = auth.currentUser.uid;
  const fileName = selectedFile.value.name;
  const fileRef = storageRef(storage, `pictures/${userId}/${fileName}`);

  const uploadTask = uploadBytesResumable(fileRef, selectedFile.value);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.error("Upload failed:", error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      images.value.push({ name: fileName, url: downloadURL });
      selectedFile.value = null;
    }
  );
}

async function deleteFile(fileName: string) {
  if (!auth.currentUser) return;

  const userId = auth.currentUser.uid;
  const fileRef = storageRef(storage, `pictures/${userId}/${fileName}`);

  try {
    await deleteObject(fileRef);
    images.value = images.value.filter((image) => image.name !== fileName);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

const handleClickImage = (url: string) => {
    selectedImageUrl.value = url;
    showFullImage.value = true;
}

onMounted(() => {
  fetchImages();
});
</script>

<template>
  <main class="flex flex-col gap-4 p-2">
    <h2 class="text-lg font-semibold">Twoja prywatna galeria</h2>

    <nav class="flex gap-5 items-center w-full">
        <v-file-input label="Wybierz zdjęcie" class="min-w-[250px]"  @change="handleFileUpload" variant="underlined"></v-file-input>
        <v-btn :color="color" @click="uploadFile" :disabled="!selectedFile" variant="elevated">
            <span class="text-white text-xs"> Dodaj zdjęcie</span>
        </v-btn>
    </nav>


    <div v-if="images.length > 0">
      <h3 class="text-lg font-semibold">Zdjęcia</h3>
      <div class="flex flex-wrap gap-4">
        <div v-for="image in images" :key="image.name" class="photo shadow-md w-fit py-1 px-4 rounded-sm">
        <img :src="image.url" alt="User's photo" class="cursor-pointer w-[200px]" @click="() => handleClickImage(image.url)"/>
        <v-btn
            icon="mdi-trash-can-outline"
            size="30"
            height="30"
            class="text-xs"
            @click="deleteFile(image.name)"
          />
      </div>
        </div>
    </div>
  </main>

  <v-dialog v-model="showFullImage">
    <template v-slot:default="{ isActive }">
        <img :src="selectedImageUrl" alt="User's photo" class="max-w-[70vw] max-h-[90vh] object-contain self-center" />
    </template>
  </v-dialog>
</template>

<style scoped>
.photo {
  display: flex;
  align-items: center;
  margin-top: 1em;
}
.photo img {
  width: 150px;
  margin-right: 10px;
}
</style>
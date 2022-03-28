<template>
  <vs-row>
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6" offset="3">
      <h2>{{ getTitle }}</h2>
      <EntryFormMenu
          :saveBtnActive="isFormValid"
          @btnPress="handleBtnPress"
      />
      <div>
        <vs-input
            primary
            :label-placeholder="$t('label.input.entry.id')"
            v-model="editingEntry.id"
            class="mt-2"
        >
          <template #message-danger v-if="!editingEntry.id">
            {{ $t('notice.required') }}
          </template>
        </vs-input>
        <vs-input
            primary
            :label-placeholder="$t('label.input.entry.temperature')"
            v-model="editingEntry.temperature"
            class="mt-2"
        />
      </div>
    </vs-col>
  </vs-row>
</template>

<script>
import EntryFormMenu from '@/components/form/EntryFormMenu';
import ButtonType from '@/types/ButtonType';
import FormMode from '@/types/FormMode';

import { mapActions } from 'vuex';
import EventBus from '@/event-bus';

export default {
  name: 'EntryForm',

  components: {
    EntryFormMenu
  },

  props: {
    mode: {
      type: String,
      default: FormMode.NEW,
    },
  },

  data: () => ({
    originEntry: {},
    editingEntry: {
      id: '',
      temperature: '',
    }
  }),

  created() {
    if (this.mode === FormMode.EDIT) {
      this.getEntryDetails();
    }
  },

  computed: {
    isFormValid() {
      return !!this.editingEntry.id;
    },

    getTitle() {
      return this.mode === FormMode.EDIT
          ? this.$t('heading.entry.edit')
          : this.$t('heading.entry.new');
    }
  },

  methods: {
    ...mapActions(['getEntryById', 'addEntry', 'editEntry']),

    handleBtnPress({ action }) {
      switch (action) {
        case ButtonType.SAVE:
          if (!this.isFormValid) {
            break;
          }
          this.saveEntry();
          break;
        case ButtonType.BACK:
          this.goBack();
          break;
        default:
          console.error('UNKNOWN BUTTON TYPE', action)
      }
    },

    goBack() {
      this.$router.push({
        name: 'EntriesList',
      })
    },

    saveEntry() {
      switch (this.mode) {
        case FormMode.NEW:
          try {
            this.addEntry({
              newEntry: this.editingEntry,
            });
            EventBus.$emit('onShowSuccessMessage',
                this.$t('message.new.entry.added'),
            );
            this.goBack();
          } catch (e) {
            EventBus.$emit('onShowError', e);
          }
          break;
        case FormMode.EDIT:
          try {
            this.editEntry({
              originEntry: this.originEntry,
              editedEntry: this.editingEntry,
            })
            EventBus.$emit('onShowSuccessMessage',
                this.$t('message.entry.edited'),
            );
            this.goBack();
          } catch (e) {
            EventBus.$emit('onShowError', e);
          }
          break;
        default:
          console.error('UNKNOWN MODE TYPE', this.mode);
      }
    },

    async getEntryDetails() {
      const id = this.$route.params.id
      const entry = await this.getEntryById(id);
      if (entry) {
        this.originEntry = this.$_.cloneDeep(entry);
        this.editingEntry = this.$_.cloneDeep(entry);
      } else {
        await this.$router.push({
          name: 'EntryFormNew',
        })
      }
    },
  }
}
</script>

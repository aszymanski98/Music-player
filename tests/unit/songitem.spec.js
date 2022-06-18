import SongItem from '@/components/SongItem.vue';
import { mount, RouterLinkStub } from '@vue/test-utils';

describe('SongItem.vue', () => {
  it('render song.modified_name', () => {
    const song = {
      modified_name: 'test',
    };

    const wrapper = mount(SongItem, {
      props: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    const songName = wrapper.find('.text-gray-600');

    expect(songName.text()).toContain(song.modified_name);
  });
  it('renders song.docID in id attribute', () => {
    const song = {
      docID: 'abc',
    };

    const wrapper = mount(SongItem, {
      props: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    expect(wrapper.attributes().id).toBe(`song-id-${song.docID}`);
  });
});

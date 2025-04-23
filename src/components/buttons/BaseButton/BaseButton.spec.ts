import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/buttons/BaseButton/BaseButton.vue';
import { Save } from 'lucide-vue-next';

describe('BaseButton.vue', () => {
  it('renders label text', () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Save', isLoading: false },
    });

    expect(wrapper.text()).toContain('Save');
  });

  it('renders icon when passed and not loading', () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Create', icon: Save, isLoading: false },
    });

    expect(wrapper.findComponent(Save).exists()).toBe(true);
  });

  it('does not show icon while loading', () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Saving...', icon: Save, isLoading: true },
    });

    expect(wrapper.findComponent(Save).exists()).toBe(false);
    expect(wrapper.find('svg.animate-spin').exists()).toBe(true);
  });

  it('disables button when loading', () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Save', isLoading: true },
    });

    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Submit' },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: { label: 'Submit', disabled: true },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });
});

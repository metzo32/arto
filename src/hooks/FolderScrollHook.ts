import { useEffect } from 'react';

const useFolderScroll = (wrapperRef: React.RefObject<HTMLElement>, stickyRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky) return;

    const sections = sticky.querySelectorAll<HTMLElement>('.section');
    const length = sections.length;
    const headerVh = 6;
    const contentVh = 96 - headerVh * length;

    let start = wrapper.offsetTop + 100;
    let end = wrapper.offsetTop + wrapper.offsetHeight - window.innerHeight - 100;

    const init = () => {
      start = wrapper.offsetTop + 100;
      end = wrapper.offsetTop + wrapper.offsetHeight - window.innerHeight - 100;

      sections.forEach((section, i) => {
        section.style.bottom = `${-100 + headerVh * (length - i)}vh`;
        const title = section.querySelector('.title') as HTMLElement;
        const content = section.querySelector('.content') as HTMLElement;
        if (title) title.style.height = `${headerVh}vh`;
        if (content) content.style.height = `${contentVh}vh`;
      });
    };

    const animate = () => {
      sections.forEach((section, i) => {
        const unit = (end - start) / length;
        const s = start + unit * i + 100;
        const e = start + unit * (i + 1);

        if (window.scrollY <= s) {
          section.style.transform = `translate3d(0, 0, 0)`;
        } else if (window.scrollY >= e) {
          section.style.transform = `translate3d(0, ${-contentVh}%, 0)`;
        } else {
          section.style.transform = `translate3d(0, ${(window.scrollY - s) / (unit - 100) * (-contentVh)}%, 0)`;
        }
      });
    };

    window.addEventListener('resize', init);
    window.addEventListener('scroll', animate);

    init();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('scroll', animate);
    };
  }, [wrapperRef, stickyRef]);
};

export default useFolderScroll;

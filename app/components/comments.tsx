'use client';
import Giscus from '@giscus/react';
import Text from 'app/components/text';

export default function Comments() {
  return (
    <div className="mt-8 mb-8">
      <Text.H size="3">Got thoughts?</Text.H>
      <Giscus
        repo="t1mmen/timm.stokke.me"
        repoId="MDEwOlJlcG9zaXRvcnkxNTE3Nzk5Ng=="
        category="Announcements"
        categoryId="DIC_kwDOAOeZDM4CaOZ8"
        mapping="pathname"
        strict="0"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="bottom"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}

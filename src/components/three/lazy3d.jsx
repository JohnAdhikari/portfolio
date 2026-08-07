import { Suspense, lazy } from 'react';

// Code-splits each 3D scene so Three.js only loads when a section is needed.
// The fallback keeps layout stable and shows nothing until the chunk arrives.

function makeLazy(factory, Fallback) {
  const Cmp = lazy(factory);
  return function LazyScene(props) {
    return (
      <Suspense fallback={Fallback ? <Fallback {...props} /> : null}>
        <Cmp {...props} />
      </Suspense>
    );
  };
}

export const Hero3D = makeLazy(() => import('./Hero3D'), () => (
  <div className="aspect-square w-64 rounded-full border border-dashed border-line sm:w-80" />
));

export const SkillsOrbit = makeLazy(() => import('./SkillsOrbit'));

export const ProjectIcon3D = makeLazy(() => import('./ProjectIcon3D'));

export const ParticleField = makeLazy(() => import('./ParticleField'));

export default { Hero3D, SkillsOrbit, ProjectIcon3D, ParticleField };

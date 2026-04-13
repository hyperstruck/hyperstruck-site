import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import * as THREE from 'three';

import type { LearningModule } from '../data/siteContent';

interface ThreeModulePreviewProps {
  accentColor: string;
  progress: number;
  variant: LearningModule['animationVariant'];
}

interface DisposableScene {
  dispose: () => void;
  update: (elapsedSeconds: number) => void;
}

function createMaterial(
  color: string,
  options?: Partial<THREE.MeshPhysicalMaterialParameters>,
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.34,
    metalness: 0.08,
    transparent: true,
    opacity: 0.94,
    ...options,
  });
}

function createOrb(
  registerGeometry: <T extends THREE.BufferGeometry>(geometry: T) => T,
  registerMaterial: <T extends THREE.Material>(material: T) => T,
  color: string,
  radius: number,
  emissiveIntensity: number,
): {
  mesh: THREE.Mesh;
  material: THREE.MeshPhysicalMaterial;
} {
  const material = registerMaterial(
    createMaterial(color, {
      emissive: color,
      emissiveIntensity,
    }),
  );
  const mesh = new THREE.Mesh(
    registerGeometry(new THREE.SphereGeometry(radius, 20, 20)),
    material,
  );

  return { mesh, material };
}

function createDashedLine(
  registerGeometry: <T extends THREE.BufferGeometry>(geometry: T) => T,
  registerMaterial: <T extends THREE.Material>(material: T) => T,
  points: THREE.Vector3[],
  color: string,
  opacity: number,
): THREE.Line {
  const geometry = registerGeometry(new THREE.BufferGeometry().setFromPoints(points));
  const material = registerMaterial(
    new THREE.LineDashedMaterial({
      color,
      transparent: true,
      opacity,
      dashSize: 0.14,
      gapSize: 0.1,
    }),
  );
  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();
  return line;
}

function createVariantScene(
  scene: THREE.Scene,
  variant: LearningModule['animationVariant'],
  accentColor: string,
): DisposableScene {
  const rootGroup = new THREE.Group();
  scene.add(rootGroup);
  rootGroup.scale.setScalar(
    variant === 'confidence' ? 1.36 : variant === 'architecture' ? 1.24 : variant === 'experiential' ? 1.04 : 1.18,
  );
  rootGroup.rotation.x =
    variant === 'experiential'
      ? -0.08
      : variant === 'verification'
      ? -0.42
      : variant === 'architecture'
        ? -0.34
        : variant === 'confidence'
          ? -0.24
          : -0.18;
  rootGroup.rotation.y =
    variant === 'experiential'
      ? -0.1
      : variant === 'architecture'
        ? -0.28
        : variant === 'verification'
          ? -0.2
          : -0.14;

  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const registerGeometry = <T extends THREE.BufferGeometry>(geometry: T): T => {
    geometries.push(geometry);
    return geometry;
  };

  const registerMaterial = <T extends THREE.Material>(material: T): T => {
    materials.push(material);
    return material;
  };

  const panelMaterial = registerMaterial(
    createMaterial('#171c29', {
      emissive: accentColor,
      emissiveIntensity: 0.06,
      opacity: 0.92,
    }),
  );
  const accentMaterial = registerMaterial(
    createMaterial(accentColor, {
      emissive: accentColor,
      emissiveIntensity: 0.34,
    }),
  );
  const softMaterial = registerMaterial(
    createMaterial('#cfd4ff', {
      emissive: '#cfd4ff',
      emissiveIntensity: 0.16,
      opacity: 0.56,
    }),
  );
  const cyanMaterial = registerMaterial(
    createMaterial('#4cd7f6', {
      emissive: '#4cd7f6',
      emissiveIntensity: 0.28,
      opacity: 0.9,
    }),
  );
  const subtleLineMaterial = registerMaterial(
    new THREE.LineBasicMaterial({
      color: '#cfd4ff',
      transparent: true,
      opacity: 0.24,
    }),
  );
  const accentLineMaterial = registerMaterial(
    new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.54,
    }),
  );

  if (variant === 'experiential') {
    const graphLeft = -3;
    const graphRight = 2.85;
    const graphBottom = -1.92;
    const graphTop = 1.4;
    const baselineValue = 20;
    const encounterValues = [25, 70, 80, 85, 90, 92];
    const xPositions = Array.from({ length: encounterValues.length }, (_, index) =>
      THREE.MathUtils.lerp(-2.68, 2.55, index / (encounterValues.length - 1)),
    );
    const projectY = (value: number): number =>
      THREE.MathUtils.lerp(graphBottom, graphTop, value / 100);
    const baselineY = projectY(baselineValue);

    const axes = registerGeometry(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(graphLeft, graphBottom, 0),
        new THREE.Vector3(graphLeft, graphTop, 0),
        new THREE.Vector3(graphLeft, graphBottom, 0),
        new THREE.Vector3(graphRight, graphBottom, 0),
      ]),
    );
    rootGroup.add(new THREE.LineSegments(axes, subtleLineMaterial));

    [20, 40, 60, 80, 100].forEach((value) => {
      const y = projectY(value);
      const guide = createDashedLine(
        registerGeometry,
        registerMaterial,
        [
          new THREE.Vector3(graphLeft, y, -0.02),
          new THREE.Vector3(graphRight, y, -0.02),
        ],
        value === baselineValue ? '#98a3b8' : '#cfd4ff',
        value === baselineValue ? 0.42 : 0.12,
      );
      rootGroup.add(guide);

      const tick = registerGeometry(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(graphLeft, y, 0),
          new THREE.Vector3(graphLeft + 0.12, y, 0),
        ]),
      );
      rootGroup.add(new THREE.Line(tick, subtleLineMaterial));
    });

    xPositions.forEach((tickX) => {
      const tick = registerGeometry(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(tickX, graphBottom, 0),
          new THREE.Vector3(tickX, graphBottom + 0.12, 0),
        ]),
      );
      rootGroup.add(new THREE.Line(tick, subtleLineMaterial));
    });

    const fillShape = new THREE.Shape();
    fillShape.moveTo(xPositions[0], baselineY);
    encounterValues.forEach((value, index) => {
      fillShape.lineTo(xPositions[index], projectY(value));
    });
    fillShape.lineTo(xPositions[xPositions.length - 1], baselineY);
    fillShape.lineTo(xPositions[0], baselineY);

    const fillMaterial = registerMaterial(
      new THREE.MeshBasicMaterial({
        color: '#dbe7ff',
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    const fill = new THREE.Mesh(registerGeometry(new THREE.ShapeGeometry(fillShape)), fillMaterial);
    fill.position.z = -0.04;
    rootGroup.add(fill);

    const baseline = createDashedLine(
      registerGeometry,
      registerMaterial,
      [
        new THREE.Vector3(xPositions[0], baselineY, 0.06),
        new THREE.Vector3(xPositions[xPositions.length - 1], baselineY, 0.06),
      ],
      '#98a3b8',
      0.72,
    );
    rootGroup.add(baseline);

    const linePoints = encounterValues.map(
      (value, index) => new THREE.Vector3(xPositions[index], projectY(value), 0.12 + index * 0.04),
    );
    const line = new THREE.Line(
      registerGeometry(new THREE.BufferGeometry().setFromPoints(linePoints)),
      registerMaterial(
        new THREE.LineBasicMaterial({
          color: '#2f66e3',
          transparent: true,
          opacity: 0.96,
        }),
      ),
    );
    rootGroup.add(line);

    const points = linePoints.map((position, index) => {
      const orb = createOrb(
        registerGeometry,
        registerMaterial,
        '#2f66e3',
        index === linePoints.length - 1 ? 0.13 : 0.11,
        index >= 4 ? 0.58 : 0.36,
      );
      orb.mesh.position.copy(position);
      rootGroup.add(orb.mesh);
      return orb;
    });

    const baselineMarkers = xPositions.map((x) => {
      const orb = createOrb(registerGeometry, registerMaterial, '#98a3b8', 0.05, 0.08);
      orb.mesh.position.set(x, baselineY, 0.05);
      orb.material.opacity = 0.22;
      rootGroup.add(orb.mesh);
      return orb;
    });

    const sweep = createOrb(registerGeometry, registerMaterial, '#4cd7f6', 0.09, 0.42);
    rootGroup.add(sweep.mesh);

    return {
      update: (elapsedSeconds: number) => {
        line.material.opacity = 0.88 + Math.sin(elapsedSeconds * 0.9) * 0.08;
        fillMaterial.opacity = 0.14 + Math.sin(elapsedSeconds * 0.75) * 0.03;

        points.forEach((point, index) => {
          const pulse = Math.max(0, Math.sin(elapsedSeconds * 1.55 + index * 0.45));
          point.material.emissiveIntensity =
            (index >= 4 ? 0.46 : 0.28) + pulse * (index >= 4 ? 0.26 : 0.18);
          point.mesh.scale.setScalar(index === points.length - 1 ? 1.1 + pulse * 0.1 : 1 + pulse * 0.08);
          point.mesh.position.z = linePoints[index].z + Math.sin(elapsedSeconds * 1.15 + index) * 0.03;
        });

        baselineMarkers.forEach((marker, index) => {
          marker.material.opacity = 0.18 + Math.max(0, Math.sin(elapsedSeconds * 1.4 + index * 0.3)) * 0.14;
        });

        const sweepT = (elapsedSeconds * 0.12) % 1;
        const scaledIndex = sweepT * (linePoints.length - 1);
        const currentIndex = Math.floor(scaledIndex);
        const nextIndex = Math.min(currentIndex + 1, linePoints.length - 1);
        const localT = scaledIndex - currentIndex;
        sweep.mesh.position.lerpVectors(linePoints[currentIndex], linePoints[nextIndex], localT);
        sweep.mesh.position.z += 0.1;
        sweep.material.opacity = 0.5 + Math.sin(elapsedSeconds * 2.1) * 0.16;
        sweep.material.emissiveIntensity = 0.34 + Math.sin(elapsedSeconds * 1.8) * 0.12;
      },
      dispose: () => {
        scene.remove(rootGroup);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
      },
    };
  }

  if (variant === 'confidence') {
    const graphLeft = -2.72;
    const graphRight = 2.72;
    const graphBottom = -1.82;
    const graphTop = 1.32;

    const axes = registerGeometry(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(graphLeft, graphBottom, 0),
        new THREE.Vector3(graphLeft, graphTop, 0),
        new THREE.Vector3(graphLeft, graphBottom, 0),
        new THREE.Vector3(graphRight, graphBottom, 0),
      ]),
    );
    rootGroup.add(new THREE.LineSegments(axes, subtleLineMaterial));

    const curvePoints = Array.from({ length: 48 }, (_, index) => {
      const t = index / 47;
      const x = THREE.MathUtils.lerp(-2.46, 2.42, t);
      const exponentialRise = (Math.exp(t * 2.4) - 1) / (Math.exp(2.4) - 1);
      const y = THREE.MathUtils.lerp(-1.18, 1.22, exponentialRise);
      return new THREE.Vector3(x, y, t * 0.46);
    });
    const curve = registerGeometry(new THREE.BufferGeometry().setFromPoints(curvePoints));
    rootGroup.add(new THREE.Line(curve, accentLineMaterial));

    const guidePoints = [-2.12, -0.48, 1.28].map((x, index) => {
      const orb = createOrb(
        registerGeometry,
        registerMaterial,
        index === 2 ? accentColor : '#cfd4ff',
        index === 2 ? 0.18 : 0.14,
        index === 2 ? 0.6 : 0.22,
      );
      const t = index / 2;
      const exponentialRise = (Math.exp(t * 2.4) - 1) / (Math.exp(2.4) - 1);
      orb.mesh.position.set(x, THREE.MathUtils.lerp(-1.02, 1.02, exponentialRise), t * 0.38);
      rootGroup.add(orb.mesh);
      return orb;
    });

    const memoryOrbs = Array.from({ length: 7 }, (_, index) => {
      const color = index < 3 ? '#4cd7f6' : index < 5 ? '#cfd4ff' : accentColor;
      const orb = createOrb(registerGeometry, registerMaterial, color, 0.14, 0.32);
      rootGroup.add(orb.mesh);
      return { ...orb, offset: index / 7 };
    });

    return {
      update: (elapsedSeconds: number) => {
        guidePoints.forEach((orb, index) => {
          orb.mesh.position.z = index * 0.18 + Math.sin(elapsedSeconds * 1.2 + index) * 0.08;
          orb.material.emissiveIntensity =
            (index === 2 ? 0.5 : 0.18) + Math.max(0, Math.sin(elapsedSeconds * 1.6 + index * 0.7)) * 0.16;
        });

        memoryOrbs.forEach((orb, index) => {
          const t = (elapsedSeconds * 0.09 + orb.offset) % 1;
          const exponentialRise = (Math.exp(t * 2.6) - 1) / (Math.exp(2.6) - 1);
          const x = THREE.MathUtils.lerp(-2.42, 2.38, t);
          const y = THREE.MathUtils.lerp(-1.12, 1.18, exponentialRise);
          const z = 0.12 + Math.sin(elapsedSeconds * 1.9 + index * 0.8) * 0.28 + t * 0.46;

          orb.mesh.position.set(x, y, z);
          orb.mesh.scale.setScalar(0.9 + exponentialRise * 0.28);
          orb.material.emissiveIntensity = 0.22 + exponentialRise * 0.46;
          orb.material.opacity = 0.58 + exponentialRise * 0.34;
        });
      },
      dispose: () => {
        scene.remove(rootGroup);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
      },
    };
  }

  if (variant === 'verification') {
    const platforms = [
      { width: 4.8, y: -1.4 },
      { width: 3.45, y: 0 },
      { width: 2.15, y: 1.35 },
    ];

    platforms.forEach((platform, index) => {
      const mesh = new THREE.Mesh(
        registerGeometry(new THREE.BoxGeometry(platform.width, 0.18, 0.24)),
        index === 2 ? accentMaterial : softMaterial,
      );
      mesh.position.y = platform.y;
      rootGroup.add(mesh);
    });

    const bottomColor = new THREE.Color('#4cd7f6');
    const middleColor = new THREE.Color('#cfd4ff');
    const topColor = new THREE.Color(accentColor);

    const travelingOrbs = Array.from({ length: 9 }, (_, index) => {
      const orb = createOrb(registerGeometry, registerMaterial, '#4cd7f6', 0.13, 0.28);
      rootGroup.add(orb.mesh);
      return { ...orb, offset: index / 9 };
    });

    return {
      update: (elapsedSeconds: number) => {
        travelingOrbs.forEach((orb, index) => {
          const t = (elapsedSeconds * 0.07 + orb.offset) % 1;
          let x = 0;
          let y = 0;
          let color = bottomColor;
          let intensity = 0.28;

          if (t < 0.56) {
            const phase = t / 0.56;
            x = -1.9 + phase * 3.8;
            y = platforms[0].y + 0.34 + Math.sin(phase * Math.PI * 2 + index * 0.4) * 0.05;
            orb.mesh.position.z = Math.sin(elapsedSeconds * 1.7 + index) * 0.32;
          } else if (t < 0.84) {
            const phase = (t - 0.56) / 0.28;
            x = THREE.MathUtils.lerp(0.9, 0.1, phase);
            y = THREE.MathUtils.lerp(platforms[0].y + 0.34, platforms[1].y + 0.34, phase);
            color = new THREE.Color().lerpColors(bottomColor, middleColor, phase);
            intensity = 0.28 + phase * 0.16;
            orb.mesh.position.z = 0.18 + Math.sin(elapsedSeconds * 1.4 + index * 0.6) * 0.18;
          } else {
            const phase = (t - 0.84) / 0.16;
            x = THREE.MathUtils.lerp(0.05, 0, phase);
            y = THREE.MathUtils.lerp(platforms[1].y + 0.34, platforms[2].y + 0.34, phase);
            color = new THREE.Color().lerpColors(middleColor, topColor, phase);
            intensity = 0.44 + phase * 0.18;
            orb.mesh.position.z = 0.36 + Math.sin(elapsedSeconds * 1.3 + index * 0.6) * 0.12;
          }

          orb.mesh.position.x = x;
          orb.mesh.position.y = y;
          orb.material.color.copy(color);
          orb.material.emissive.copy(color);
          orb.material.emissiveIntensity = intensity;
          orb.mesh.scale.setScalar(0.92 + intensity * 0.18);
        });
      },
      dispose: () => {
        scene.remove(rootGroup);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
      },
    };
  }

  if (variant === 'attribution') {
    const timeline = registerGeometry(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3.05, 0, 0),
        new THREE.Vector3(3.05, 0, 0),
      ]),
    );
    rootGroup.add(new THREE.Line(timeline, subtleLineMaterial));

    const notchPositions = [-2.5, -1.2, 0.2, 1.45, 2.55];
    const nodes = notchPositions.flatMap((x, notchIndex) => {
      const notch = registerGeometry(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x, -0.22, 0),
          new THREE.Vector3(x, 0.22, 0),
        ]),
      );
      rootGroup.add(new THREE.Line(notch, accentLineMaterial));

      return [-0.58, -0.26, 0.32].map((offset, nodeIndex) => {
        const color = nodeIndex === 1 ? accentColor : '#cfd4ff';
        const orb = createOrb(registerGeometry, registerMaterial, color, 0.08, 0.08);
        orb.mesh.position.set(x + (nodeIndex - 1) * 0.18, offset, 0);
        orb.material.opacity = 0.34;
        rootGroup.add(orb.mesh);
        return { ...orb, threshold: notchIndex / notchPositions.length };
      });
    });

    const sweep = createOrb(registerGeometry, registerMaterial, accentColor, 0.12, 0.48);
    rootGroup.add(sweep.mesh);

    return {
      update: (elapsedSeconds: number) => {
        const t = (elapsedSeconds * 0.12) % 1;
        sweep.mesh.position.set(-3 + t * 6, 0, 0.22 + Math.sin(elapsedSeconds * 2.1) * 0.12);

        nodes.forEach((orb) => {
          const active = t > orb.threshold;
          orb.material.emissiveIntensity = active ? 0.54 : 0.06;
          orb.material.opacity = active ? 0.96 : 0.24;
          orb.mesh.position.z = active ? 0.12 : 0;
        });
      },
      dispose: () => {
        scene.remove(rootGroup);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
      },
    };
  }

  if (variant === 'conflict') {
    const leftColor = '#4cd7f6';
    const rightColor = '#d0bcff';
    const leftColorValue = new THREE.Color(leftColor);
    const rightColorValue = new THREE.Color(rightColor);
    const intermediateWinnerColor = new THREE.Color('#a7d3ff');
    const leftBall = createOrb(registerGeometry, registerMaterial, leftColor, 0.22, 0.4);
    const rightBall = createOrb(registerGeometry, registerMaterial, rightColor, 0.22, 0.4);
    rootGroup.add(leftBall.mesh, rightBall.mesh);

    const particles = Array.from({ length: 18 }, (_, index) => {
      const color = index % 2 === 0 ? leftColor : rightColor;
      const orb = createOrb(registerGeometry, registerMaterial, color, 0.05, 0.26);
      rootGroup.add(orb.mesh);
      return { ...orb, isWinningColor: index % 2 === 1 };
    });

    const survivor = createOrb(registerGeometry, registerMaterial, rightColor, 0.24, 0.5);
    rootGroup.add(survivor.mesh);

    return {
      update: (elapsedSeconds: number) => {
        const t = (elapsedSeconds * 0.115) % 1;

        leftBall.material.color.copy(leftColorValue);
        leftBall.material.emissive.copy(leftColorValue);
        rightBall.material.color.copy(rightColorValue);
        rightBall.material.emissive.copy(rightColorValue);
        survivor.material.color.copy(rightColorValue);
        survivor.material.emissive.copy(rightColorValue);

        if (t < 0.18) {
          const approach = t / 0.18;
          leftBall.mesh.visible = true;
          rightBall.mesh.visible = true;
          survivor.mesh.visible = false;
          leftBall.material.opacity = 0.94;
          rightBall.material.opacity = 0.94;
          leftBall.material.emissiveIntensity = 0.4;
          rightBall.material.emissiveIntensity = 0.4;
          particles.forEach((particle) => {
            particle.mesh.visible = false;
            particle.material.opacity = 0;
            particle.material.emissiveIntensity = 0.12;
          });
          leftBall.mesh.position.set(
            -2.45 + approach * 1.75,
            Math.sin(approach * Math.PI) * 0.12,
            -0.12 + approach * 0.1,
          );
          rightBall.mesh.position.set(
            2.45 - approach * 1.75,
            Math.sin(approach * Math.PI + Math.PI * 0.45) * 0.12,
            0.26 - approach * 0.08,
          );
          leftBall.mesh.scale.setScalar(1);
          rightBall.mesh.scale.setScalar(1);
        } else if (t < 0.28) {
          const recoil = (t - 0.18) / 0.1;
          const contactPulse = Math.sin(recoil * Math.PI);
          const separation = THREE.MathUtils.lerp(0.68, 1.24, recoil);

          leftBall.mesh.visible = true;
          rightBall.mesh.visible = true;
          survivor.mesh.visible = false;
          leftBall.material.opacity = 0.94;
          rightBall.material.opacity = 0.94;
          leftBall.material.emissiveIntensity = 0.42 + contactPulse * 0.26;
          rightBall.material.emissiveIntensity = 0.42 + contactPulse * 0.26;

          leftBall.mesh.position.set(
            -separation,
            Math.sin(recoil * Math.PI * 1.1) * 0.16,
            -0.08 + contactPulse * 0.1,
          );
          rightBall.mesh.position.set(
            separation,
            -Math.sin(recoil * Math.PI * 1.05) * 0.14,
            0.18 - contactPulse * 0.08,
          );
          leftBall.mesh.scale.setScalar(1 + contactPulse * 0.12);
          rightBall.mesh.scale.setScalar(1 + contactPulse * 0.12);

          particles.forEach((particle, index) => {
            const angle = (index / particles.length) * Math.PI * 2;
            const radius = 0.12 + contactPulse * 0.42;
            particle.mesh.visible = true;
            particle.mesh.position.set(
              Math.cos(angle) * radius,
              Math.sin(angle * 1.35) * radius * 0.42,
              Math.cos(angle * 0.8) * radius * 0.2,
            );
            particle.material.opacity = contactPulse * 0.24;
            particle.material.emissiveIntensity = 0.1 + contactPulse * 0.12;
          });
        } else if (t < 0.74) {
          const debate = (t - 0.28) / 0.46;
          const exchanges = debate * Math.PI * 6;
          const swing = Math.cos(exchanges);
          const impactPulse = Math.pow(Math.max(0, Math.cos(exchanges * 0.5)), 6);
          const separation = 0.95 + swing * 0.55;
          const arcY = Math.sin(exchanges * 0.62) * 0.38;
          const arcZ = Math.sin(exchanges * 0.92) * 0.46;

          leftBall.mesh.visible = true;
          rightBall.mesh.visible = true;
          survivor.mesh.visible = false;
          leftBall.material.opacity = 0.94;
          rightBall.material.opacity = 0.94;

          leftBall.mesh.position.set(-separation, arcY, -0.14 + arcZ * 0.3);
          rightBall.mesh.position.set(separation, -arcY * 0.75, 0.2 - arcZ * 0.2);
          leftBall.mesh.scale.setScalar(1 + impactPulse * 0.18);
          rightBall.mesh.scale.setScalar(1 + impactPulse * 0.18);
          leftBall.material.emissiveIntensity = 0.34 + impactPulse * 0.42;
          rightBall.material.emissiveIntensity = 0.34 + impactPulse * 0.42;

          particles.forEach((particle, index) => {
            particle.mesh.visible = true;
            const angle = (index / particles.length) * Math.PI * 2 + exchanges * 0.35;
            const radius = 0.18 + impactPulse * 0.95 + Math.sin(exchanges + index) * 0.04;
            const direction = particle.isWinningColor ? 1 : -1;
            particle.mesh.position.set(
              Math.cos(angle) * radius * 0.9,
              Math.sin(angle * 1.6) * radius * 0.46,
              Math.cos(angle * 0.8) * radius * 0.56 + direction * impactPulse * 0.12,
            );
            particle.material.opacity = 0.14 + impactPulse * 0.72;
            particle.material.emissiveIntensity = 0.1 + impactPulse * 0.32;
          });
        } else if (t < 0.88) {
          const resolve = (t - 0.74) / 0.14;
          const mergeBlend = Math.sin(resolve * Math.PI);
          const survivorColor = new THREE.Color().lerpColors(
            leftColorValue,
            rightColorValue,
            THREE.MathUtils.smoothstep(resolve, 0.38, 1),
          );

          leftBall.mesh.visible = true;
          rightBall.mesh.visible = true;
          survivor.mesh.visible = true;

          leftBall.mesh.position.set(
            THREE.MathUtils.lerp(-0.92, -0.1, resolve),
            THREE.MathUtils.lerp(0.18, 0.02, resolve),
            THREE.MathUtils.lerp(-0.12, 0.08, resolve),
          );
          rightBall.mesh.position.set(
            THREE.MathUtils.lerp(0.92, 0.1, resolve),
            THREE.MathUtils.lerp(-0.12, -0.02, resolve),
            THREE.MathUtils.lerp(0.18, 0.1, resolve),
          );
          leftBall.mesh.scale.setScalar(1 - resolve * 0.28);
          rightBall.mesh.scale.setScalar(1 - resolve * 0.12);
          leftBall.material.opacity = 0.92 - resolve * 0.72;
          rightBall.material.opacity = 0.92 - resolve * 0.4;
          leftBall.material.emissiveIntensity = 0.38 - resolve * 0.18;
          rightBall.material.emissiveIntensity = 0.42 + resolve * 0.08;

          particles.forEach((particle, index) => {
            particle.mesh.visible = true;
            const angle = (index / particles.length) * Math.PI * 2;
            const startRadius = particle.isWinningColor ? 0.92 : 0.74;
            const radius = THREE.MathUtils.lerp(startRadius, particle.isWinningColor ? 0.22 : 1.58, resolve);
            particle.mesh.position.set(
              Math.cos(angle) * radius,
              Math.sin(angle * 1.35) * radius * 0.48,
              Math.cos(angle * 0.85) * radius * 0.34,
            );
            particle.material.opacity = particle.isWinningColor
              ? 0.78 - resolve * 0.58
              : 0.54 - resolve * 0.54;
            particle.material.emissiveIntensity = particle.isWinningColor
              ? 0.34 + resolve * 0.1
              : 0.18 - resolve * 0.16;
          });

          survivor.mesh.scale.setScalar(0.72 + resolve * 0.74 + mergeBlend * 0.06);
          survivor.mesh.position.set(0, 0, 0.16 + resolve * 0.12);
          survivor.material.color.copy(survivorColor);
          survivor.material.emissive.copy(survivorColor);
          survivor.material.opacity = 0.5 + resolve * 0.42;
          survivor.material.emissiveIntensity = 0.42 + resolve * 0.3;
        } else {
          const hold = (t - 0.88) / 0.12;
          const survivorColor = new THREE.Color().lerpColors(
            intermediateWinnerColor,
            rightColorValue,
            hold,
          );
          leftBall.mesh.visible = false;
          rightBall.mesh.visible = true;
          survivor.mesh.visible = true;
          particles.forEach((particle) => {
            particle.mesh.visible = particle.isWinningColor;
            if (particle.isWinningColor) {
              particle.mesh.position.multiplyScalar(0.94);
              particle.material.opacity = 0.08 * (1 - hold);
            }
          });

          rightBall.mesh.position.set(
            THREE.MathUtils.lerp(0.1, 0.02, hold),
            THREE.MathUtils.lerp(-0.02, 0, hold),
            THREE.MathUtils.lerp(0.1, 0.2, hold),
          );
          rightBall.mesh.scale.setScalar(0.88 - hold * 0.22);
          rightBall.material.opacity = 0.52 * (1 - hold);
          rightBall.material.emissiveIntensity = 0.46 * (1 - hold * 0.5);

          survivor.mesh.scale.setScalar(1.5 + Math.sin(hold * Math.PI) * 0.06);
          survivor.mesh.position.set(0, 0, 0.28);
          survivor.material.color.copy(survivorColor);
          survivor.material.emissive.copy(survivorColor);
          survivor.material.opacity = 0.92;
          survivor.material.emissiveIntensity = 0.72 + hold * 0.12;
        }
      },
      dispose: () => {
        scene.remove(rootGroup);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
      },
    };
  }

  const separators = registerGeometry(
    new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3.05, 1.45, 0),
      new THREE.Vector3(3.05, 1.45, 0),
      new THREE.Vector3(-3.05, 0, 0),
      new THREE.Vector3(3.05, 0, 0),
      new THREE.Vector3(-3.05, -1.45, 0),
      new THREE.Vector3(3.05, -1.45, 0),
    ]),
  );
  rootGroup.add(new THREE.LineSegments(separators, subtleLineMaterial));

  const graphNodes = [
    new THREE.Vector3(-2.2, 1.45, 0),
    new THREE.Vector3(-1.25, 1.82, 0),
    new THREE.Vector3(-0.18, 1.3, 0),
    new THREE.Vector3(0.92, 1.76, 0),
    new THREE.Vector3(2.08, 1.4, 0),
  ];
  const graphEdges = registerGeometry(
    new THREE.BufferGeometry().setFromPoints([
      graphNodes[0],
      graphNodes[1],
      graphNodes[1],
      graphNodes[2],
      graphNodes[2],
      graphNodes[3],
      graphNodes[3],
      graphNodes[4],
    ]),
  );
  rootGroup.add(new THREE.LineSegments(graphEdges, accentLineMaterial));

  const graphMeshes = graphNodes.map((node) => {
    const orb = createOrb(registerGeometry, registerMaterial, accentColor, 0.09, 0.14);
    orb.mesh.position.copy(node);
    rootGroup.add(orb.mesh);
    return orb;
  });

  const vectorBars = Array.from({ length: 8 }, (_, index) => {
    const height = 0.24 + (index % 4) * 0.12;
    const mesh = new THREE.Mesh(
      registerGeometry(new THREE.BoxGeometry(0.26, height, 0.16)),
      cyanMaterial,
    );
    mesh.position.set(-2.35 + index * 0.62, 0, 0);
    rootGroup.add(mesh);
    return mesh;
  });

  const relationalCells = Array.from({ length: 9 }, (_, index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const mesh = new THREE.Mesh(
      registerGeometry(new THREE.BoxGeometry(0.38, 0.28, 0.14)),
      registerMaterial(
        createMaterial('#cfd4ff', {
          emissive: '#cfd4ff',
          emissiveIntensity: 0.08,
          opacity: 0.42,
        }),
      ),
    );
    mesh.position.set(-1.2 + column * 1.2, -1.87 + row * 0.42, 0);
    rootGroup.add(mesh);
    return mesh;
  });

  return {
    update: (elapsedSeconds: number) => {
      graphMeshes.forEach((orb, index) => {
        orb.material.emissiveIntensity =
          0.12 + Math.max(0, Math.sin(elapsedSeconds * 2 + index * 0.6)) * 0.46;
        orb.mesh.position.z = Math.sin(elapsedSeconds * 1.7 + index * 0.6) * 0.18;
      });

      vectorBars.forEach((mesh, index) => {
        mesh.scale.y = 0.8 + Math.max(0, Math.sin(elapsedSeconds * 1.8 + index * 0.48)) * 0.62;
      });

      relationalCells.forEach((mesh, index) => {
        const material = mesh.material as THREE.MeshPhysicalMaterial;
        const lit = Math.sin(elapsedSeconds * 1.5 + index * 0.6) > 0.35;
        material.emissiveIntensity = lit ? 0.28 : 0.06;
        material.opacity = lit ? 0.92 : 0.28;
        mesh.position.z = lit ? 0.16 : 0;
      });
    },
    dispose: () => {
      scene.remove(rootGroup);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
    },
  };
}

function renderOverlay(
  variant: LearningModule['animationVariant'],
  accentColor: string,
): ReactNode {
  if (variant === 'experiential') {
    return (
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: 14,
            left: 34,
            color: 'text.primary',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          Correct action taken (%)
        </Typography>
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: 34,
            left: 34,
            color: 'text.secondary',
          }}
        >
          The more tasks completed, the better the agent gets
        </Typography>
        {[
          { label: '100%', top: '21%' },
          { label: '80%', top: '36%' },
          { label: '60%', top: '51%' },
          { label: '40%', top: '66%' },
          { label: '20%', top: '81%' },
        ].map((tick) => (
          <Typography
            key={tick.label}
            variant="caption"
            sx={{
              position: 'absolute',
              left: 10,
              top: tick.top,
              color: 'text.secondary',
              transform: 'translateY(-50%)',
              minWidth: 18,
              textAlign: 'right',
            }}
          >
            {tick.label}
          </Typography>
        ))}
        {[
          { label: '1st', left: '13%' },
          { label: '2nd', left: '28%' },
          { label: '3rd', left: '43%' },
          { label: '4th', left: '58%' },
          { label: '5th', left: '73%' },
          { label: '6th', left: '88%' },
        ].map((run, index) => (
          <Typography
            key={run.label}
            variant="caption"
            sx={{
              position: 'absolute',
              left: run.left,
              bottom: 54,
              color: 'text.secondary',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              lineHeight: 1.1,
              whiteSpace: 'pre-line',
            }}
          >
            {index === 0 ? '1st\n(new)' : run.label}
          </Typography>
        ))}
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 28,
            color: 'text.secondary',
            transform: 'translateX(-50%)',
          }}
        >
          Encounter number
        </Typography>
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: 56,
            right: 28,
            color: accentColor,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Learned from
          <br />
          prior encounters
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            right: 16,
            bottom: 18,
            px: 1.25,
            py: 0.9,
            borderRadius: 1.5,
            backgroundColor: alpha('#0b0e14', 0.58),
            border: `1px solid ${alpha(accentColor, 0.16)}`,
          }}
        >
          <Stack spacing={0.7}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 18,
                  height: 2,
                  bgcolor: '#2f66e3',
                  boxShadow: `0 0 8px ${alpha('#2f66e3', 0.45)}`,
                }}
              />
              <Typography variant="caption" sx={{ color: 'text.primary' }}>
                With learnings
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 18,
                  height: 0,
                  borderTop: '2px dashed rgba(152, 163, 184, 0.9)',
                }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Without learnings
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  }

  if (variant === 'confidence') {
    return (
      <Box
        sx={{
          position: 'absolute',
          left: '10%',
          width: '80%',
          bottom: '8%',
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {['Low confidence', 'High confidence'].map((label) => (
          <Typography
            key={label}
            variant="caption"
            sx={{
              width: '50%',
              color: 'text.secondary',
              textAlign: 'center',
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>
    );
  }

  if (variant === 'architecture') {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          left: 18,
          pointerEvents: 'none',
        }}
      >
        {[
          { label: 'Graph', top: '18%' },
          { label: 'Vector', top: '47%' },
          { label: 'Relational', top: '76%' },
        ].map((item) => (
          <Typography
            key={item.label}
            variant="caption"
            sx={{
              position: 'absolute',
              top: item.top,
              color: 'text.secondary',
              backgroundColor: alpha('#0b0e14', 0.38),
              px: 1,
              py: 0.3,
              borderRadius: 1,
              width: 'fit-content',
            }}
          >
            {item.label}
          </Typography>
        ))}
      </Box>
    );
  }

  return null;
}

export default function ThreeModulePreview({
  accentColor,
  progress,
  variant,
}: ThreeModulePreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const showAnimation = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    if (!showAnimation) {
      return undefined;
    }

    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.25, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight('#ffffff', 1.1);
    const pointLight = new THREE.PointLight(accentColor, 7, 20, 2);
    pointLight.position.set(2.4, 2.6, 5);
    const fillLight = new THREE.PointLight('#d7e2ff', 2.4, 22, 2);
    fillLight.position.set(-2.8, -2.4, 5);
    scene.add(ambientLight, pointLight, fillLight);

    const variantScene = createVariantScene(scene, variant, accentColor);
    const clock = new THREE.Clock();

    const resizeRenderer = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width === 0 || height === 0) {
        return;
      }

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resizeRenderer);
    resizeObserver.observe(container);
    resizeRenderer();

    let animationFrame = 0;
    const renderFrame = () => {
      animationFrame = window.requestAnimationFrame(renderFrame);
      variantScene.update(clock.getElapsedTime());
      renderer.render(scene, camera);
    };
    renderFrame();

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }

      resizeObserver.disconnect();
      variantScene.dispose();
      scene.remove(ambientLight, pointLight, fillLight);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [accentColor, showAnimation, variant]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 220, sm: 260, md: 320 },
        borderRadius: 4,
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${alpha('#101419', 0.92)} 0%, ${alpha(accentColor, 0.08)} 100%)`,
        border: `1px solid ${alpha(accentColor, 0.14)}`,
        boxShadow: `inset 0 1px 0 ${alpha('#ffffff', 0.05)}`,
        transform: `translate3d(0, ${(0.5 - progress) * 18}px, 0)`,
        transition: 'transform 160ms linear',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '8% 10% auto auto',
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(accentColor, 0.18)} 0%, transparent 72%)`,
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />
      {showAnimation ? <Box ref={containerRef} sx={{ position: 'absolute', inset: 0 }} /> : null}
      {showAnimation ? renderOverlay(variant, accentColor) : null}
    </Box>
  );
}

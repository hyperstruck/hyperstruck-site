import { Box, Typography } from '@mui/material';
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

function createBulb(
  registerGeometry: <T extends THREE.BufferGeometry>(geometry: T) => T,
  registerMaterial: <T extends THREE.Material>(material: T) => T,
  color: string,
  scale = 1,
): {
  group: THREE.Group;
  headMaterial: THREE.MeshPhysicalMaterial;
} {
  const group = new THREE.Group();
  const headMaterial = registerMaterial(
    createMaterial(color, { emissive: color, emissiveIntensity: 0.32 }),
  );
  const baseMaterial = registerMaterial(
    createMaterial('#a8b0c3', {
      emissive: '#a8b0c3',
      emissiveIntensity: 0.08,
      opacity: 0.82,
    }),
  );

  const head = new THREE.Mesh(
    registerGeometry(new THREE.SphereGeometry(0.16, 16, 16)),
    headMaterial,
  );
  head.position.y = 0.12;

  const neck = new THREE.Mesh(
    registerGeometry(new THREE.CylinderGeometry(0.05, 0.06, 0.12, 12)),
    baseMaterial,
  );
  neck.position.y = -0.02;

  const base = new THREE.Mesh(
    registerGeometry(new THREE.CylinderGeometry(0.09, 0.12, 0.12, 12)),
    baseMaterial,
  );
  base.position.y = -0.16;

  group.add(head, neck, base);
  group.scale.setScalar(scale);

  return { group, headMaterial };
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
    const cpu = new THREE.Mesh(
      registerGeometry(new THREE.BoxGeometry(1.12, 1.12, 0.34)),
      panelMaterial,
    );
    rootGroup.add(cpu);

    const ballColors = ['#4cd7f6', '#d0bcff', '#8083ff', '#acedff', '#e9ddff', '#5de0e6'];
    const movingBalls = Array.from({ length: 12 }, (_, index) => {
      const color = ballColors[index % ballColors.length];
      const mesh = new THREE.Mesh(
        registerGeometry(new THREE.SphereGeometry(0.12, 16, 16)),
        registerMaterial(
          createMaterial(color, { emissive: color, emissiveIntensity: 0.34 }),
        ),
      );
      rootGroup.add(mesh);
      return mesh;
    });

    const targetDots = Array.from({ length: 12 }, (_, index) => {
      const row = Math.floor(index / 4);
      const column = index % 4;
      const color = ballColors[index % ballColors.length];
      const mesh = new THREE.Mesh(
        registerGeometry(new THREE.SphereGeometry(0.1, 14, 14)),
        registerMaterial(
          createMaterial(color, {
            emissive: color,
            emissiveIntensity: 0.12,
            opacity: 0.2,
          }),
        ),
      );
      mesh.position.set(1.62 + column * 0.42, 0.48 - row * 0.42, 0);
      rootGroup.add(mesh);
      return mesh;
    });

    return {
      update: (elapsedSeconds: number) => {
        cpu.rotation.y = Math.sin(elapsedSeconds * 0.8) * 0.05;

        movingBalls.forEach((ball, index) => {
          const cycle = (elapsedSeconds * 0.18 + index / movingBalls.length) % 1;
          const row = Math.floor(index / 4);
          const targetY = 0.48 - row * 0.42;
          const sourceY = 0.94 - (index % 6) * 0.34;

          if (cycle < 0.45) {
            const t = cycle / 0.45;
            ball.position.set(
              -3.1 + t * 2.45,
              sourceY + Math.sin(elapsedSeconds * 2.3 + index) * 0.12,
              0,
            );
            ball.scale.setScalar(1);
          } else if (cycle < 0.58) {
            const t = (cycle - 0.45) / 0.13;
            ball.position.set(-0.2 + t * 0.4, sourceY * (1 - t) * 0.18, 0);
            ball.scale.setScalar(1 - t * 0.45);
          } else {
            const t = (cycle - 0.58) / 0.42;
            ball.position.set(0.55 + t * 2.35, THREE.MathUtils.lerp(0, targetY, t), 0);
            ball.scale.setScalar(0.6 + t * 0.4);
          }
        });

        targetDots.forEach((dot, index) => {
          const material = dot.material as THREE.MeshPhysicalMaterial;
          material.opacity = 0.12 + Math.max(0, Math.sin(elapsedSeconds * 2 + index * 0.45)) * 0.18;
        });
      },
      dispose: () => {
        scene.remove(rootGroup);
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
      },
    };
  }

  if (variant === 'confidence') {
    const axes = registerGeometry(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-3.1, -1.8, 0),
        new THREE.Vector3(-3.1, 1.65, 0),
        new THREE.Vector3(-3.1, -1.8, 0),
        new THREE.Vector3(3.05, -1.8, 0),
      ]),
    );
    rootGroup.add(new THREE.LineSegments(axes, subtleLineMaterial));

    rootGroup.add(
      createDashedLine(
        registerGeometry,
        registerMaterial,
        [new THREE.Vector3(-1.05, -1.8, 0), new THREE.Vector3(-1.05, 1.4, 0)],
        '#cfd4ff',
        0.36,
      ),
    );
    rootGroup.add(
      createDashedLine(
        registerGeometry,
        registerMaterial,
        [new THREE.Vector3(1.1, -1.8, 0), new THREE.Vector3(1.1, 1.4, 0)],
        '#cfd4ff',
        0.36,
      ),
    );

    const curvePoints = Array.from({ length: 40 }, (_, index) => {
      const t = index / 39;
      const x = -2.75 + t * 5.35;
      const y = -1.1 + t * 2.1 + Math.sin(t * Math.PI * 1.6) * 0.28;
      return new THREE.Vector3(x, y, 0);
    });
    const curve = registerGeometry(new THREE.BufferGeometry().setFromPoints(curvePoints));
    rootGroup.add(new THREE.Line(curve, accentLineMaterial));

    const bulbs = Array.from({ length: 8 }, (_, index) => {
      const bulb = createBulb(
        registerGeometry,
        registerMaterial,
        index % 2 === 0 ? accentColor : '#cfd4ff',
        0.9,
      );
      rootGroup.add(bulb.group);
      return bulb;
    });

    return {
      update: (elapsedSeconds: number) => {
        bulbs.forEach((bulb, index) => {
          const t = (elapsedSeconds * 0.08 + index / bulbs.length) % 1;
          const x = -2.7 + t * 5.3;
          const y =
            -1.08 +
            t * 2.1 +
            Math.sin(t * Math.PI * 1.6) * 0.28 +
            Math.sin(elapsedSeconds * 2 + index) * 0.04;
          bulb.group.position.set(x, y, 0);
          bulb.headMaterial.emissiveIntensity = x > 1.1 ? 0.72 : x > -1.05 ? 0.42 : 0.22;
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
      { width: 4.8, y: -1.4, count: 8 },
      { width: 3.45, y: 0, count: 5 },
      { width: 2.15, y: 1.35, count: 2 },
    ];

    platforms.forEach((platform, index) => {
      const mesh = new THREE.Mesh(
        registerGeometry(new THREE.BoxGeometry(platform.width, 0.18, 0.24)),
        index === 2 ? accentMaterial : softMaterial,
      );
      mesh.position.y = platform.y;
      rootGroup.add(mesh);
    });

    const bulbs = platforms.flatMap((platform, platformIndex) =>
      Array.from({ length: platform.count }, (_, index) => {
        const color =
          platformIndex === 0 ? '#4cd7f6' : platformIndex === 1 ? '#cfd4ff' : accentColor;
        const bulb = createBulb(registerGeometry, registerMaterial, color, 0.82);
        const usableWidth = platform.width - 0.6;
        const x = -usableWidth / 2 + ((index + 1) * usableWidth) / (platform.count + 1);
        bulb.group.position.set(x, platform.y + 0.34, 0);
        rootGroup.add(bulb.group);
        return { ...bulb, baseX: x, baseY: platform.y + 0.34, platformIndex };
      }),
    );

    return {
      update: (elapsedSeconds: number) => {
        bulbs.forEach((bulb, index) => {
          const oscillation = Math.max(0, Math.sin(elapsedSeconds * 1.4 + index * 0.55));
          const rise =
            bulb.platformIndex === 0
              ? oscillation * 0.3
              : bulb.platformIndex === 1
                ? oscillation * 0.16
                : oscillation * 0.08;
          bulb.group.position.x = bulb.baseX + Math.sin(elapsedSeconds + index) * 0.03;
          bulb.group.position.y = bulb.baseY + rise;
          bulb.headMaterial.emissiveIntensity =
            bulb.platformIndex === 2 ? 0.62 : bulb.platformIndex === 1 ? 0.42 : 0.26;
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
        const mesh = new THREE.Mesh(
          registerGeometry(new THREE.SphereGeometry(0.08, 14, 14)),
          registerMaterial(
            createMaterial(nodeIndex === 1 ? accentColor : '#cfd4ff', {
              emissive: nodeIndex === 1 ? accentColor : '#cfd4ff',
              emissiveIntensity: 0.08,
              opacity: 0.34,
            }),
          ),
        );
        mesh.position.set(x + (nodeIndex - 1) * 0.18, offset, 0);
        rootGroup.add(mesh);
        return { mesh, threshold: notchIndex / notchPositions.length };
      });
    });

    const sweep = new THREE.Mesh(
      registerGeometry(new THREE.SphereGeometry(0.12, 16, 16)),
      accentMaterial,
    );
    rootGroup.add(sweep);

    return {
      update: (elapsedSeconds: number) => {
        const t = (elapsedSeconds * 0.12) % 1;
        sweep.position.set(-3 + t * 6, 0, 0);

        nodes.forEach(({ mesh, threshold }) => {
          const material = mesh.material as THREE.MeshPhysicalMaterial;
          const active = t > threshold;
          material.emissiveIntensity = active ? 0.54 : 0.06;
          material.opacity = active ? 0.96 : 0.24;
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
    const leftBall = new THREE.Mesh(
      registerGeometry(new THREE.SphereGeometry(0.22, 18, 18)),
      registerMaterial(createMaterial(leftColor, { emissive: leftColor, emissiveIntensity: 0.4 })),
    );
    const rightBall = new THREE.Mesh(
      registerGeometry(new THREE.SphereGeometry(0.22, 18, 18)),
      registerMaterial(createMaterial(rightColor, { emissive: rightColor, emissiveIntensity: 0.4 })),
    );
    rootGroup.add(leftBall, rightBall);

    const particles = Array.from({ length: 18 }, (_, index) => {
      const color = index % 2 === 0 ? leftColor : rightColor;
      const mesh = new THREE.Mesh(
        registerGeometry(new THREE.SphereGeometry(0.05, 12, 12)),
        registerMaterial(createMaterial(color, { emissive: color, emissiveIntensity: 0.3 })),
      );
      rootGroup.add(mesh);
      return mesh;
    });

    const survivor = new THREE.Mesh(
      registerGeometry(new THREE.SphereGeometry(0.24, 18, 18)),
      registerMaterial(createMaterial(rightColor, { emissive: rightColor, emissiveIntensity: 0.5 })),
    );
    rootGroup.add(survivor);

    return {
      update: (elapsedSeconds: number) => {
        const t = (elapsedSeconds * 0.2) % 1;

        if (t < 0.38) {
          const approach = t / 0.38;
          leftBall.visible = true;
          rightBall.visible = true;
          survivor.visible = false;
          particles.forEach((particle) => {
            particle.visible = false;
          });
          leftBall.position.set(-2.4 + approach * 2.1, 0, 0);
          rightBall.position.set(2.4 - approach * 2.1, 0, 0);
        } else if (t < 0.6) {
          const explode = (t - 0.38) / 0.22;
          leftBall.visible = false;
          rightBall.visible = false;
          survivor.visible = false;
          particles.forEach((particle, index) => {
            particle.visible = true;
            const angle = (index / particles.length) * Math.PI * 2;
            const radius = explode * 0.95;
            particle.position.set(
              Math.cos(angle) * radius,
              Math.sin(angle * 1.4) * radius * 0.58,
              0,
            );
            const material = particle.material as THREE.MeshPhysicalMaterial;
            material.opacity = 0.8 - explode * 0.48;
          });
        } else {
          const reform = (t - 0.6) / 0.4;
          leftBall.visible = false;
          rightBall.visible = false;
          particles.forEach((particle) => {
            particle.visible = false;
          });
          survivor.visible = true;
          survivor.scale.setScalar(0.7 + reform * 0.36);
          survivor.position.set(reform * 0.42, 0, 0);
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
    const mesh = new THREE.Mesh(
      registerGeometry(new THREE.SphereGeometry(0.09, 14, 14)),
      registerMaterial(createMaterial(accentColor, { emissive: accentColor, emissiveIntensity: 0.14 })),
    );
    mesh.position.copy(node);
    rootGroup.add(mesh);
    return mesh;
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
      graphMeshes.forEach((mesh, index) => {
        const material = mesh.material as THREE.MeshPhysicalMaterial;
        material.emissiveIntensity =
          0.12 + Math.max(0, Math.sin(elapsedSeconds * 2 + index * 0.6)) * 0.46;
      });

      vectorBars.forEach((mesh, index) => {
        mesh.scale.y = 0.8 + Math.max(0, Math.sin(elapsedSeconds * 1.8 + index * 0.48)) * 0.62;
      });

      relationalCells.forEach((mesh, index) => {
        const material = mesh.material as THREE.MeshPhysicalMaterial;
        const lit = Math.sin(elapsedSeconds * 1.5 + index * 0.6) > 0.35;
        material.emissiveIntensity = lit ? 0.28 : 0.06;
        material.opacity = lit ? 0.92 : 0.28;
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
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          px: 1.5,
          py: 0.6,
          borderRadius: 1.5,
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: 'text.primary',
          backgroundColor: alpha('#0b0e14', 0.68),
          border: `1px solid ${alpha(accentColor, 0.24)}`,
          pointerEvents: 'none',
        }}
      >
        HS Learning
      </Box>
    );
  }

  if (variant === 'confidence') {
    return (
      <Box
        sx={{
          position: 'absolute',
          left: 18,
          right: 18,
          bottom: 16,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          pointerEvents: 'none',
        }}
      >
        {['Low confidence', 'Neutral confidence', 'High confidence'].map((label) => (
          <Typography
            key={label}
            variant="caption"
            sx={{ color: 'text.secondary', textAlign: 'center' }}
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
          top: 20,
          left: 18,
          display: 'grid',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        {['Graph', 'Vector', 'Relational'].map((label) => (
          <Typography
            key={label}
            variant="caption"
            sx={{
              color: 'text.secondary',
              backgroundColor: alpha('#0b0e14', 0.38),
              px: 1,
              py: 0.3,
              borderRadius: 1,
              width: 'fit-content',
            }}
          >
            {label}
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
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

      const aspect = width / height;
      camera.left = -4 * aspect;
      camera.right = 4 * aspect;
      camera.top = 3.2;
      camera.bottom = -3.2;
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
  }, [accentColor, variant]);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 280, md: 420 },
        borderRadius: 4,
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${alpha('#101419', 0.92)} 0%, ${alpha(accentColor, 0.08)} 100%)`,
        border: `1px solid ${alpha(accentColor, 0.14)}`,
        boxShadow: `inset 0 1px 0 ${alpha('#ffffff', 0.05)}`,
        transform: `translate3d(0, ${(0.5 - progress) * 26}px, 0)`,
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
      <Box ref={containerRef} sx={{ position: 'absolute', inset: 0 }} />
      {renderOverlay(variant, accentColor)}
    </Box>
  );
}

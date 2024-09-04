import mapboxgl from 'mapbox-gl';

export type LayersProps = {
    map: mapboxgl.Map;
};

export const CIRCLE_MIN_SIZE = 6;
export const CIRCLE_MAX_SIZE = 10;

export const CIRCLE_AROUND_MIN_SIZE = CIRCLE_MIN_SIZE + 5;
export const CIRCLE_AROUND_MAX_SIZE = CIRCLE_MAX_SIZE + 7;

export const size = 125;

export const createDot = (map: mapboxgl.Map, color: string) => ({
    width  : size,
    height : size,
    data   : new Uint8ClampedArray(size * size * 4),
    context: null as null | CanvasRenderingContext2D,

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // Call once before every frame where the icon will be used.
    render() {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const { context } = this;

        if (!context) return;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color}, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color}, 1)`;
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        // eslint-disable-next-line consistent-return
        return true;
    }
});

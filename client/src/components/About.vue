<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';
</script>

<template>
    <MainLayout>
        <section class="problem-statement">
            <div class="container">
                <h3>The "Seasonal Friend" Cycle</h3>
                <p>We’ve all seen it: during the <strong>High Season</strong>, we can’t get a table, our calls go unanswered, and the "locals' discount" suddenly vanishes. But the moment the tourists leave and the <strong>Off-Season</strong> hits, those same businesses come looking for our support to keep their lights on.</p>
                <p>We believe loyalty should be a two-way street, 365 days a year.</p>
            </div>
        </section>

        <hr>

        <section class="features-grid">
            <div class="container">
                <h3>How No Locals Changes the Game</h3>
                <div class="grid">
                    <div class="card">
                        <h4>The Year-Round List</h4>
                        <p>A curated directory of businesses that value local residents even when the crowds are thick.</p>
                    </div>
                    <div class="card">
                        <h4>Real-Time Alerts</h4>
                        <p>Know which spots are currently "tourist-only" or charging seasonal surcharges before you leave the house.</p>
                    </div>
                    <div class="card">
                        <h4>Community Voice</h4>
                        <p>A space for us to share which businesses are standing by the community and which ones are just using us as a backup plan.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="bio-section">
            <div class="container">
                <h3>Behind the Movement</h3>
                <p>I’m a local just like you. I started <strong>No Locals</strong> after being told there was "no room" at my favorite neighborhood pub, only to watch them seat a group of travelers five minutes later. I realized we needed a way to track who actually supports the people who live here.</p>
            </div>
        </section>

        <section class="call-to-action">
            <div class="container">
                <h2>Done being the "backup plan"?</h2>
                <p>Help us build the ultimate local-first directory.</p>
                <a href="#" class="btn">Submit a Business Tip</a>
                <a href="#" class="btn btn-secondary">Join the Community</a>
            </div>
        </section>
    </MainLayout>
</template>